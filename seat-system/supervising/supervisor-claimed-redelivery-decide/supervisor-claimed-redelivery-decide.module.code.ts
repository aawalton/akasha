export interface ClaimedTranscriptFinding {
  readonly outcome: "injected" | "lost" | "not-yet" | "absent"
  readonly selfRead: boolean
}

export interface ClaimedCandidate {
  readonly id: string
  readonly claimedAtMs: number
  readonly finding: ClaimedTranscriptFinding | null
}

export type ClaimSkipReason = "in-flight" | "injected" | "self-read" | "not-yet" | "unreadable"

export interface ClaimedSkip {
  readonly id: string
  readonly reason: ClaimSkipReason
}

export interface ClaimedRedeliveryDecision {
  readonly release: readonly string[]
  readonly skipped: readonly ClaimedSkip[]
}

/** The reason to hold a candidate back, or null where it is released. */
function skipReasonFor(
  candidate: ClaimedCandidate,
  processStartedAtMs: number
): ClaimSkipReason | null {
  if (candidate.claimedAtMs >= processStartedAtMs) return "in-flight"
  const finding = candidate.finding
  if (finding === null) return "unreadable"
  if (finding.selfRead) return "self-read"
  if (finding.outcome === "injected") return "injected"
  if (finding.outcome === "not-yet") return "not-yet"
  return null
}

export function decideClaimedRedelivery(opts: {
  readonly candidates: readonly ClaimedCandidate[]
  readonly processStartedAtMs: number
}): ClaimedRedeliveryDecision {
  const release: string[] = []
  const skipped: ClaimedSkip[] = []
  for (const candidate of opts.candidates) {
    const reason = skipReasonFor(candidate, opts.processStartedAtMs)
    if (reason === null) release.push(candidate.id)
    else skipped.push({ id: candidate.id, reason })
  }
  return { release, skipped }
}
