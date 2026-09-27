export const DEFAULT_STALE_AFTER_HOURS = 24

type Liveness = "live" | "stale"

type LivenessReason = "live" | "recency"

interface LivenessInput {
  readonly lastSeenAtMs: number
  readonly frontierMs: number
  readonly staleAfterMs: number
}

export interface LivenessVerdict {
  readonly verdict: Liveness
  readonly reason: LivenessReason
}

export function classifyLiveness(input: LivenessInput): LivenessVerdict {
  const { lastSeenAtMs, frontierMs, staleAfterMs } = input

  const recencyStale = frontierMs - lastSeenAtMs > staleAfterMs
  if (recencyStale) return { verdict: "stale", reason: "recency" }

  return { verdict: "live", reason: "live" }
}
