export type PreCliffObservation = {
  childAgeMs: number | null
  alreadyArmed: boolean
  deferredOrActionPending: boolean
}

export type PreCliffDecision = "arm" | "wait"

export function decidePreCliffRestart(
  obs: PreCliffObservation,
  thresholdMs: number
): PreCliffDecision {
  if (obs.alreadyArmed) return "wait"
  if (obs.childAgeMs === null) return "wait"
  if (obs.childAgeMs < thresholdMs) return "wait"
  if (obs.deferredOrActionPending) return "wait"
  return "arm"
}
