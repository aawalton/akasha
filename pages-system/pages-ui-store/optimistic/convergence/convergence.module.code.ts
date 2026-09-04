import { isRecord } from "@akasha/utils-narrow/is-record"
import { jsonEqual } from "@akasha/utils-narrow/json-equal"
import type { Collection } from "@tanstack/db"
import { FILE_BACKING_POLL_MS } from "../../collection/fetch-attach/fetch-attach.module.code.ts"
import { asPageRow, type PageRow } from "../../collection/page-row/page-row.module.code.ts"

export const DEFAULT_TICK_MS = 250

export const CONVERGENCE_CEILING_MS = FILE_BACKING_POLL_MS * 2

export class ConvergenceUnreached extends Error {
  readonly rowId: string
  readonly keys: readonly string[]
  readonly generations: number
  readonly elapsedMs: number

  constructor(args: {
    readonly rowId: string
    readonly keys: readonly string[]
    readonly generations: number
    readonly elapsedMs: number
  }) {
    super(
      `the server accepted a write to row ${args.rowId} and the canonical row never carried it back within ${args.elapsedMs}ms over ${args.generations} generation(s); the keys still not agreeing are: ${args.keys.join(", ") || "none stated"}`
    )
    this.name = "ConvergenceUnreached"
    this.rowId = args.rowId
    this.keys = args.keys
    this.generations = args.generations
    this.elapsedMs = args.elapsedMs
  }
}

export interface ConvergenceResult {
  readonly generations: number
  readonly elapsedMs: number
}

export type WaitForTick = (generation: number) => Promise<void>

export interface ConvergenceOptions {
  readonly tickMs?: number
  readonly ceilingMs?: number
  readonly now?: () => number
  readonly waitForTick?: WaitForTick
}

export function readCanonicalRow(
  collection: Collection<PageRow, string>,
  rowId: string
): PageRow | undefined {
  const state = collection._state
  let current: Record<string, unknown> | undefined = state.syncedData.get(rowId)
  for (const tx of state.pendingSyncedTransactions) {
    if (tx.committed !== true) continue
    for (const op of tx.operations) {
      if (op.key !== rowId) continue
      if (op.type === "delete") {
        current = undefined
        continue
      }
      const value = op.value
      if (!isRecord(value)) continue
      current = op.type === "update" ? { ...(current ?? {}), ...value } : { ...value }
    }
  }
  return current === undefined ? undefined : asPageRow(current)
}

export function predictedSetSatisfied(
  predictedSet: Readonly<Record<string, unknown>>,
  canonicalRow: PageRow
): boolean {
  const attrs = isRecord(canonicalRow.attributes) ? canonicalRow.attributes : {}
  for (const key of Object.keys(predictedSet)) {
    if (!jsonEqual(attrs[key], predictedSet[key])) return false
  }
  return true
}

function defaultWaitForTick(
  collection: Collection<PageRow, string>,
  tickMs: number
): Promise<void> {
  return new Promise<void>((resolve) => {
    let settled = false
    const finish = (): undefined => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      subscription.unsubscribe()
      resolve()
    }
    const subscription = collection.subscribeChanges(() => finish())
    const timer = setTimeout(finish, tickMs)
  })
}

export async function awaitConvergence(
  collection: Collection<PageRow, string>,
  rowId: string,
  predictedSet: Readonly<Record<string, unknown>>,
  options: ConvergenceOptions = {}
): Promise<ConvergenceResult> {
  const tickMs = options.tickMs ?? DEFAULT_TICK_MS
  const ceilingMs = options.ceilingMs ?? CONVERGENCE_CEILING_MS
  const now = options.now ?? Date.now
  const waitForTick: WaitForTick =
    options.waitForTick ?? (() => defaultWaitForTick(collection, tickMs))

  const started = now()
  let generation = 0
  while (true) {
    const canonical = readCanonicalRow(collection, rowId)
    const elapsedMs = now() - started
    if (canonical !== undefined && predictedSetSatisfied(predictedSet, canonical)) {
      return { generations: generation, elapsedMs }
    }
    if (elapsedMs >= ceilingMs) {
      throw new ConvergenceUnreached({
        rowId,
        keys: Object.keys(predictedSet),
        generations: generation,
        elapsedMs,
      })
    }
    await waitForTick(generation)
    generation++
  }
}
