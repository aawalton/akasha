export const PROXY_LIVENESS_FAILURE_THRESHOLD = 3

export const PROXY_LIVENESS_MAX_CONSECUTIVE_RESPAWNS = 3

export type ProxyLivenessState = {
  readonly consecutiveFailures: number
  readonly consecutiveRespawns: number
  readonly gaveUp: boolean
}

export const INITIAL_PROXY_LIVENESS_STATE: ProxyLivenessState = {
  consecutiveFailures: 0,
  consecutiveRespawns: 0,
  gaveUp: false,
}

export type ProxyLivenessAction = "none" | "respawn" | "give-up"

export function decideProxyLiveness(
  state: ProxyLivenessState,
  healthy: boolean
): { state: ProxyLivenessState; action: ProxyLivenessAction } {
  if (healthy) {
    return { state: INITIAL_PROXY_LIVENESS_STATE, action: "none" }
  }
  if (state.gaveUp) {
    return { state, action: "none" }
  }
  const consecutiveFailures = state.consecutiveFailures + 1
  if (consecutiveFailures < PROXY_LIVENESS_FAILURE_THRESHOLD) {
    return { state: { ...state, consecutiveFailures }, action: "none" }
  }
  if (state.consecutiveRespawns >= PROXY_LIVENESS_MAX_CONSECUTIVE_RESPAWNS) {
    return { state: { ...state, consecutiveFailures, gaveUp: true }, action: "give-up" }
  }
  return {
    state: {
      consecutiveFailures: 0,
      consecutiveRespawns: state.consecutiveRespawns + 1,
      gaveUp: false,
    },
    action: "respawn",
  }
}
