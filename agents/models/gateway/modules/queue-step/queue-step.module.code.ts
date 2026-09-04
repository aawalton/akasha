export const CLIENT_STREAM_IDLE_CEILING_MS = 10_000

export const SILENT_QUEUE_BUDGET_MS = 6_000

export const TRANSIENT_HOLD_HORIZON_MS = 120_000

export const RESET_PROBE_MARGIN_MS = 500

export type QueueStep = { kind: "wait"; waitMs: number } | { kind: "commit" } | { kind: "exhaust" }

export function decideQueueStep(args: {
  earliestEligibleResetMs: number | null
  now: number
  silentElapsedMs: number
  silentBudgetMs: number
  transientHoldHorizonMs: number
  clientStream: boolean
}): QueueStep {
  const {
    earliestEligibleResetMs,
    now,
    silentElapsedMs,
    silentBudgetMs,
    transientHoldHorizonMs,
    clientStream,
  } = args

  if (earliestEligibleResetMs == null) return { kind: "exhaust" }
  const deltaMs = Math.max(0, earliestEligibleResetMs - now)
  if (deltaMs > transientHoldHorizonMs) return { kind: "exhaust" }

  const remainingBudgetMs = silentBudgetMs - silentElapsedMs
  if (remainingBudgetMs > 0) {
    const waitMs = Math.min(deltaMs + RESET_PROBE_MARGIN_MS, remainingBudgetMs)
    return { kind: "wait", waitMs }
  }

  return clientStream ? { kind: "commit" } : { kind: "exhaust" }
}
