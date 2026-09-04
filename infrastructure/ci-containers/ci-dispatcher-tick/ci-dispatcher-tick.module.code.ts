import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { launchAdmissions } from "../ci-container-launch/ci-container-launch.module.code.ts"
import {
  enrich,
  type StepDefinitions,
  scanDispatchingSteps,
} from "../ci-dispatch-candidates/ci-dispatch-candidates.module.code.ts"
import type { Cluster } from "../ci-dispatch-cluster/ci-dispatch-cluster.module.code.ts"
import {
  bindLine,
  confineLine,
  deferLine,
  neverFitLine,
  neverFitWaitLine,
  terminalAncestorLine,
} from "../ci-dispatch-lines/ci-dispatch-lines.module.code.ts"
import { selectNext } from "../ci-dispatch-placement/ci-dispatch-placement.module.code.ts"
import {
  applyReservations,
  RESERVATION_TTL_MS,
  reconcileLedger,
} from "../ci-dispatch-reservations/ci-dispatch-reservations.module.code.ts"
import type { Ledger } from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"
import {
  recordAssignedNode,
  recordClusterWait,
  recordDispatchWait,
  recordNeverFitWait,
  takeToFailed,
} from "../ci-dispatch-step-state/ci-dispatch-step-state.module.code.ts"
import { readCapacityFailClosed } from "../ci-node-capacity/ci-node-capacity.module.code.ts"

export const LOG = "ci-container-dispatcher:"

export const TICK_MS = 10_000

export const TICK_CEILING_MS = 120_000

export const DEFAULT_SCAN_LIMIT = 500

export interface DispatcherState {
  ledger: Ledger
}

export function initialDispatcherState(): DispatcherState {
  return { ledger: [] }
}

export interface TickDeps {
  readonly roots: Roots
  readonly cluster: Cluster
  readonly gitAccessToken: string
  readonly stickyPinning: boolean
  readonly definitions: StepDefinitions
  readonly scanLimit?: number
}

export interface TickReport {
  readonly scanned: number
  readonly admitted: number
  readonly launched: number
  readonly failed: number
  readonly timings: Readonly<Record<string, number>>
}

function say(line: string): void {
  console.log(`${LOG} ${line}`)
}

function complain(line: string, err?: unknown): void {
  if (err === undefined) console.error(`${LOG} ${line}`)
  else console.error(`${LOG} ${line}`, err)
}

export async function runDispatcherTick(
  deps: TickDeps,
  state: DispatcherState,
  signal: AbortSignal
): Promise<TickReport> {
  const { roots, cluster } = deps
  const scanLimit = deps.scanLimit ?? DEFAULT_SCAN_LIMIT
  const now = new Date()
  const nowMs = now.getTime()

  signal.throwIfAborted()
  const scanStartedAt = Date.now()
  const steps = scanDispatchingSteps(roots, scanLimit)
  const scanMs = Date.now() - scanStartedAt
  signal.throwIfAborted()

  if (steps.length === 0) {
    return { scanned: 0, admitted: 0, launched: 0, failed: 0, timings: { scanMs } }
  }

  const capacityStartedAt = Date.now()
  const capacity = await readCapacityFailClosed(cluster, complain)
  const capacityMs = Date.now() - capacityStartedAt

  signal.throwIfAborted()
  const enrichStartedAt = Date.now()
  const candidates = await enrich(
    roots,
    steps,
    (line) => complain(`skipping — ${line}`),
    deps.definitions
  )
  const enrichMs = Date.now() - enrichStartedAt

  const ledger = reconcileLedger(
    state.ledger,
    capacity.observedContainerNames,
    nowMs,
    RESERVATION_TTL_MS
  )
  const nodes = applyReservations(capacity.nodes, ledger)

  const decision = selectNext(candidates, nodes, {
    stickyPinning: deps.stickyPinning,
    now: nowMs,
  })

  for (const admission of decision.toCreate) {
    if (admission.newAssignment) say(bindLine(admission, nodes))
    else if (admission.confined) say(confineLine(admission))
  }
  for (const deferral of decision.toDefer) say(deferLine(deferral, nodes))
  for (const candidate of decision.toNeverFitWait) say(neverFitWaitLine(candidate, nodes))
  for (const failure of decision.toFail) complain(neverFitLine(failure))
  for (const candidate of decision.toSkipTerminalAncestor) complain(terminalAncestorLine(candidate))

  signal.throwIfAborted()
  const at = now.toISOString()

  for (const { candidate, node } of decision.toDefer) {
    if (candidate.dispatchWaitSince !== null && candidate.neverFitSince === null) continue
    recordDispatchWait(
      roots,
      candidate.stepSeq,
      node,
      candidate.dispatchWaitSince === null ? at : null,
      candidate.neverFitSince !== null
    )
  }
  for (const candidate of decision.toNeverFitWait) {
    if (candidate.neverFitSince !== null && candidate.dispatchWaitSince === null) continue
    recordNeverFitWait(
      roots,
      candidate.stepSeq,
      candidate.neverFitSince === null ? at : null,
      candidate.dispatchWaitSince !== null
    )
  }
  for (const candidate of decision.toHeldNoCapacity) {
    if (candidate.dispatchWaitSince !== null) continue
    recordClusterWait(roots, candidate.stepSeq, at)
  }
  for (const admission of decision.toCreate) {
    if (!admission.newAssignment) continue
    recordAssignedNode(roots, admission.candidate.pipelineSeq, admission.node)
  }

  let failed = 0
  for (const failure of decision.toFail) {
    if (takeToFailed(roots, failure.candidate.stepSeq, failure.reason)) failed += 1
  }

  signal.throwIfAborted()
  const launch = await launchAdmissions({
    roots,
    cluster,
    admissions: decision.toCreate,
    ledger,
    gitAccessToken: deps.gitAccessToken,
    now,
    say: complain,
  })
  state.ledger = launch.ledger

  return {
    scanned: steps.length,
    admitted: decision.toCreate.length,
    launched: launch.launched,
    failed,
    timings: { scanMs, enrichMs, capacityMs, ...launch.timings },
  }
}

export async function runBoundedDispatcherTick(
  deps: TickDeps,
  state: DispatcherState,
  signal: AbortSignal
): Promise<TickReport> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            `${LOG} a tick has not answered inside ${TICK_CEILING_MS}ms; ending rather than starting a second tick beside it`
          )
        ),
      TICK_CEILING_MS
    )
  })
  try {
    return await Promise.race([runDispatcherTick(deps, state, signal), ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}
