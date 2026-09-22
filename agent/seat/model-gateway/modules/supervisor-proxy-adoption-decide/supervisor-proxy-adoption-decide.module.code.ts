export type ProxyAdoptionInput = {
  readonly hasLiveProxy: boolean
  readonly versionMatches: boolean
  readonly healthy: boolean
}

export type ProxyAdoptionDecision = "adopt" | "adopt-with-drift" | "spawn-fresh"

export function decideProxyAdoption(input: ProxyAdoptionInput): ProxyAdoptionDecision {
  if (!input.hasLiveProxy) return "spawn-fresh"
  if (input.versionMatches) return "adopt"
  return input.healthy ? "adopt-with-drift" : "spawn-fresh"
}
