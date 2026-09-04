export const IDLE_STREAK_TO_RESTART = 2

export const EDGE_CONNECTION_CLIFF_PREEMPT_MS = 27_600_000

export const EDGE_CONNECTION_CLIFF_OVERRIDE_MS = 28_200_000

export const DEFAULT_REEXEC_MAX_DEFER_MS = 1_800_000

export const DEFAULT_STALE_WEDGE_MS = 600_000

export type DeferredRestartObservation = {
  idle: boolean
  busyReason?: string
  transcriptMtimeMs?: number | null
}

export type DeferredRestartConfig = { ceilingTicks?: number; staleTicks?: number }

export type DeferredRestartState = {
  idleStreak: number
  elapsedTicks: number
  staleStreak: number
  prevBusyReason: string | null
  prevTranscriptMtimeMs: number | null
}

export type DeferredRestartFireReason = "idle" | "stale-wedge" | "ceiling"

export const INITIAL_DEFERRED_RESTART_STATE: DeferredRestartState = {
  idleStreak: 0,
  elapsedTicks: 0,
  staleStreak: 0,
  prevBusyReason: null,
  prevTranscriptMtimeMs: null,
}

export function decideDeferredRestart(
  state: DeferredRestartState,
  obs: DeferredRestartObservation,
  config?: DeferredRestartConfig
): { state: DeferredRestartState; fire: boolean; fireReason: DeferredRestartFireReason | null } {
  const elapsedTicks = state.elapsedTicks + 1
  const ceilingBreached = config?.ceilingTicks !== undefined && elapsedTicks >= config.ceilingTicks
  if (!obs.idle) {
    const curReason = obs.busyReason ?? null
    const curMtime = obs.transcriptMtimeMs ?? null
    const proven =
      curReason !== null &&
      curReason === state.prevBusyReason &&
      curMtime !== null &&
      curMtime === state.prevTranscriptMtimeMs
    const staleStreak = proven ? state.staleStreak + 1 : 0
    const staleBreached = config?.staleTicks !== undefined && staleStreak >= config.staleTicks
    const fire = staleBreached || ceilingBreached
    return {
      state: {
        idleStreak: 0,
        elapsedTicks,
        staleStreak,
        prevBusyReason: curReason,
        prevTranscriptMtimeMs: curMtime,
      },
      fire,
      fireReason: fire ? (staleBreached ? "stale-wedge" : "ceiling") : null,
    }
  }
  const idleStreak = state.idleStreak + 1
  const idleFires = idleStreak >= IDLE_STREAK_TO_RESTART
  const fire = idleFires || ceilingBreached
  return {
    state: {
      idleStreak,
      elapsedTicks,
      staleStreak: 0,
      prevBusyReason: null,
      prevTranscriptMtimeMs: null,
    },
    fire,
    fireReason: fire ? (idleFires ? "idle" : "ceiling") : null,
  }
}

export function resolveMaxDeferMs(raw: string | undefined): number {
  if (raw == null || raw.trim() === "") return DEFAULT_REEXEC_MAX_DEFER_MS
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_REEXEC_MAX_DEFER_MS
  return Math.floor(parsed)
}

export function resolveStaleWedgeMs(raw: string | undefined): number {
  if (raw == null || raw.trim() === "") return DEFAULT_STALE_WEDGE_MS
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_STALE_WEDGE_MS
  return Math.floor(parsed)
}

export function resolvePreCliffOverrideMs(raw: string | undefined): number {
  if (raw == null || raw.trim() === "") return EDGE_CONNECTION_CLIFF_OVERRIDE_MS
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 0) return EDGE_CONNECTION_CLIFF_OVERRIDE_MS
  return Math.floor(parsed)
}
