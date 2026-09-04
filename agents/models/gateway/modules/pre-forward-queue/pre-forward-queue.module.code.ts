import {
  formatPoolEligibilityBreakdown,
  type PoolSummary,
  summarizePool,
} from "../../../../claude-accounts/modules/selection/claude-account-selection.module.code.ts"
import { parseClientStreamFlag } from "../client-stream/client-stream.module.code.ts"
import type { AccountState } from "../oauth-types/oauth-types.module.code.ts"
import {
  decideQueueStep,
  SILENT_QUEUE_BUDGET_MS,
  TRANSIENT_HOLD_HORIZON_MS,
} from "../queue-step/queue-step.module.code.ts"

const UNKNOWN_RESET = "unknown"

const NO_TRAIL = "-"

export const QUEUE_TURN_CEILING = 32

export const TURN_CEILING_SAID = "pre-forward-queue reached its turn ceiling"

export type QueueOutcome =
  | { readonly kind: "served"; readonly response: Response }
  | { readonly kind: "empty-pool"; readonly reason: string; readonly trailDisplay: string }

export type QueueDoors = {
  readonly attempted: () => Promise<QueueOutcome>
  readonly committed: (emptyPoolReason: string) => Response
  readonly rateLimited: (summary: PoolSummary, now: number) => Response
  readonly pacing: () => Promise<ReadonlyMap<string, AccountState>>
  readonly slept: (ms: number) => Promise<undefined>
  readonly now: () => number
  readonly said: (line: string) => undefined
}

export type QueueRequest = {
  readonly logPrefix: string
  readonly method: string
  readonly pathname: string
  readonly originalBody: ArrayBuffer | null
  readonly doors: QueueDoors
}

export function resetSaid(earliestEligibleResetMs: number | null): string {
  return earliestEligibleResetMs === null ? UNKNOWN_RESET : String(earliestEligibleResetMs)
}

export function waitLine(args: {
  readonly logPrefix: string
  readonly method: string
  readonly pathname: string
  readonly trailDisplay: string
  readonly reason: string
  readonly waitMs: number
  readonly silentElapsedMs: number
  readonly summary: PoolSummary
}): string {
  return (
    `${args.logPrefix} pre-forward-queue ${args.method} ${args.pathname} ` +
    `account=${args.trailDisplay} phase=silent-reprobe reason=${args.reason} ` +
    `wait=${args.waitMs}ms silentElapsed=${args.silentElapsedMs}ms ` +
    `earliestReset=${resetSaid(args.summary.earliestEligibleResetMs)}`
  )
}

export function commitLine(args: {
  readonly logPrefix: string
  readonly method: string
  readonly pathname: string
  readonly trailDisplay: string
  readonly reason: string
  readonly silentElapsedMs: number
  readonly summary: PoolSummary
  readonly eligibility: string
}): string {
  return (
    `${args.logPrefix} pre-forward-queue ${args.method} ${args.pathname} ` +
    `account=${args.trailDisplay} phase=commit-keepalive reason=${args.reason} ` +
    `silentElapsed=${args.silentElapsedMs}ms ` +
    `earliestReset=${resetSaid(args.summary.earliestEligibleResetMs)} ` +
    `eligibility=[${args.eligibility}]`
  )
}

export function exhaustLine(args: {
  readonly logPrefix: string
  readonly method: string
  readonly pathname: string
  readonly trailDisplay: string
  readonly reason: string
  readonly summary: PoolSummary
  readonly eligibility: string
}): string {
  return (
    `${args.logPrefix} res ${args.method} ${args.pathname} account=${args.trailDisplay} ` +
    `status=429 rebind=${args.reason} ` +
    `pool=${args.summary.eligibleCount}/${args.summary.totalCount} ` +
    `earliestReset=${resetSaid(args.summary.earliestEligibleResetMs)} ` +
    `eligibility=[${args.eligibility}]`
  )
}

export function ceilingLine(args: {
  readonly logPrefix: string
  readonly method: string
  readonly pathname: string
  readonly trailDisplay: string
  readonly silentElapsedMs: number
  readonly turnCeiling: number
}): string {
  return (
    `${args.logPrefix} pre-forward-queue ${args.method} ${args.pathname} ` +
    `account=${args.trailDisplay} phase=turn-ceiling turns=${args.turnCeiling} ` +
    `silentElapsed=${args.silentElapsedMs}ms`
  )
}

export function ceilingSaid(turnCeiling: number): string {
  return `${TURN_CEILING_SAID} of ${turnCeiling} turns`
}

export async function runPreForwardQueue(
  given: QueueRequest,
  turnCeiling: number = QUEUE_TURN_CEILING
): Promise<Response> {
  const { logPrefix, method, pathname, doors } = given
  const clientStream = parseClientStreamFlag(given.originalBody)
  let silentElapsedMs = 0
  let trailDisplay = NO_TRAIL
  for (let turn = 0; turn < turnCeiling; turn += 1) {
    const outcome = await doors.attempted()
    if (outcome.kind === "served") return outcome.response

    trailDisplay = outcome.trailDisplay
    const now = doors.now()
    const states = [...(await doors.pacing()).values()]
    const summary = summarizePool(states)
    const step = decideQueueStep({
      earliestEligibleResetMs: summary.earliestEligibleResetMs,
      now,
      silentElapsedMs,
      silentBudgetMs: SILENT_QUEUE_BUDGET_MS,
      transientHoldHorizonMs: TRANSIENT_HOLD_HORIZON_MS,
      clientStream,
    })
    const said = {
      logPrefix,
      method,
      pathname,
      trailDisplay,
      reason: outcome.reason,
      silentElapsedMs,
      summary,
    }

    if (step.kind === "wait") {
      doors.said(waitLine({ ...said, waitMs: step.waitMs }))
      await doors.slept(step.waitMs)
      silentElapsedMs += step.waitMs
      continue
    }

    const eligibility = formatPoolEligibilityBreakdown(states)

    if (step.kind === "commit") {
      doors.said(commitLine({ ...said, eligibility }))
      return doors.committed(outcome.reason)
    }

    doors.said(exhaustLine({ ...said, eligibility }))
    return doors.rateLimited(summary, now)
  }

  const spent = { logPrefix, method, pathname, trailDisplay, silentElapsedMs, turnCeiling }
  doors.said(ceilingLine(spent))
  throw new Error(ceilingSaid(turnCeiling))
}
