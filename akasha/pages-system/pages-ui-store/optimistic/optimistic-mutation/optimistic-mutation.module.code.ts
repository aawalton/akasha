import { applyJsonPatch } from "@akasha/pages-core/json-patch/apply"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { isRecord } from "@akasha/utils-narrow/is-record"
import type { Json } from "@akasha/utils-narrow/json-value"
import { type Collection, createOptimisticAction, type WritableDeep } from "@tanstack/db"
import type { PageRow } from "../../collection/page-row/page-row.module.code.ts"
import { emitStoreDiagnostic } from "../../diagnostics/diagnostics.module.code.ts"
import {
  awaitConvergence,
  type ConvergenceOptions,
  ConvergenceUnreached,
  DEFAULT_TICK_MS,
} from "../convergence/convergence.module.code.ts"
import type { PagesMutationPlan, RowOverlay } from "../plan/plan.module.code.ts"

export const SETTLE_HANDOFF_CEILING_MS = DEFAULT_TICK_MS * 5

const rowSettleChains = new WeakMap<Collection<PageRow, string>, Map<string, Promise<void>>>()

function settleChainFor(collection: Collection<PageRow, string>): Map<string, Promise<void>> {
  const existing = rowSettleChains.get(collection)
  if (existing !== undefined) return existing
  const created = new Map<string, Promise<void>>()
  rowSettleChains.set(collection, created)
  return created
}

type PlanHold = { readonly rowId: string; readonly target: Readonly<Record<string, Json>> }

function planHold(plan: PagesMutationPlan): PlanHold | undefined {
  if (plan.kind === "upsert") {
    return plan.predictedSet !== undefined
      ? { rowId: plan.rowId, target: plan.predictedSet }
      : undefined
  }
  if (plan.kind !== "patch") return undefined
  if (plan.predictedSet !== undefined) return { rowId: plan.rowId, target: plan.predictedSet }
  const attrs = plan.overlay.attributes
  if (attrs !== undefined && Object.keys(attrs).length > 0)
    return { rowId: plan.rowId, target: attrs }
  return undefined
}

function isJsonRecord(value: unknown): value is Record<string, Json> {
  return isRecord(value)
}

function applyOverlay(draft: WritableDeep<PageRow>, overlay: RowOverlay): undefined {
  if (overlay.promoted !== undefined) Object.assign(draft, overlay.promoted)
  const base: Record<string, Json> = isJsonRecord(draft.attributes) ? draft.attributes : {}
  let attrs: Record<string, Json> = { ...base, ...(overlay.attributes ?? {}) }
  if (overlay.attributesPatch !== undefined) {
    const patched = applyJsonPatch(attrs, overlay.attributesPatch)
    if (isJsonRecord(patched)) attrs = patched
  }
  draft.attributes = attrs
}

function applyPlan(collection: Collection<PageRow, string>, plan: PagesMutationPlan): undefined {
  switch (plan.kind) {
    case "create":
      collection.insert(plan.row)
      return
    case "patch":
      if (collection.has(plan.rowId)) {
        collection.update(plan.rowId, (draft) => applyOverlay(draft, plan.overlay))
      }
      return
    case "upsert":
      if (collection.has(plan.rowId)) {
        collection.update(plan.rowId, (draft) => applyOverlay(draft, plan.overlay))
      } else {
        collection.insert(plan.row)
      }
      return
    case "delete":
      if (collection.has(plan.rowId)) collection.delete(plan.rowId)
      return
    default:
      assertNever(plan)
  }
}

function reportUnconverged(err: ConvergenceUnreached): undefined {
  emitStoreDiagnostic({
    reason: "mutation-unconverged",
    message: `[pages-ui-store] a write landed on the server and never came back, so the screen is dropping the edit it is showing for row ${err.rowId}`,
    detail: err.message,
  })
  return undefined
}

async function holdUntilConverged(
  collection: Collection<PageRow, string>,
  hold: PlanHold,
  options: ConvergenceOptions
): Promise<void> {
  try {
    await awaitConvergence(collection, hold.rowId, hold.target, options)
  } catch (err: unknown) {
    if (!(err instanceof ConvergenceUnreached)) throw err
    reportUnconverged(err)
  }
}

function handedOff(priorTails: readonly Promise<void>[]): Promise<void> {
  const settled = Promise.all(priorTails.map((p) => p.catch(() => {}))).then(() => undefined)
  return Promise.race([settled, new Promise<void>((r) => setTimeout(r, SETTLE_HANDOFF_CEILING_MS))])
}

const UNSET: unique symbol = Symbol("pages-optimistic-mutation-unset")

export function runPagesOptimisticMutation<Result>(
  collection: Collection<PageRow, string>,
  plans: readonly PagesMutationPlan[],
  mutate: () => Promise<Result>,
  convergence: ConvergenceOptions = {}
): Promise<Result> {
  if (plans.length === 0) return mutate()

  const holds: PlanHold[] = []
  for (const plan of plans) {
    const hold = planHold(plan)
    if (hold !== undefined) holds.push(hold)
  }

  const chain = settleChainFor(collection)
  const holdRowIds = [...new Set(holds.map((h) => h.rowId))]
  const priorTails = holdRowIds
    .map((rowId) => chain.get(rowId))
    .filter((p): p is Promise<void> => p !== undefined)

  const { promise: settled, resolve: markSettled } = Promise.withResolvers<undefined>()
  for (const rowId of holdRowIds) chain.set(rowId, settled)

  let captured: Result | typeof UNSET = UNSET
  const run = createOptimisticAction<undefined>({
    onMutate: () => {
      for (const plan of plans) applyPlan(collection, plan)
    },
    mutationFn: async () => {
      if (priorTails.length > 0) await handedOff(priorTails)
      captured = await mutate()
      for (const hold of holds) await holdUntilConverged(collection, hold, convergence)
      return captured
    },
  })

  const tx = run(undefined)
  return tx.isPersisted.promise
    .then(() => {
      if (captured === UNSET) {
        throw new Error(
          "runPagesOptimisticMutation: mutation settled without capturing an RPC result"
        )
      }
      return captured
    })
    .finally(() => {
      markSettled(undefined)
      for (const rowId of holdRowIds) {
        if (chain.get(rowId) === settled) chain.delete(rowId)
      }
    })
}
