import { readTranscriptMtimeMs } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import {
  type BusyChildDetail,
  type IdleObservation,
  pastCliffVerdict,
} from "akasha/agent/seat/supervisor/seat-agent-idleness/modules/supervisor-idle-decide/supervisor-idle-decide.module.code.ts"
import {
  observeBusyChildDetails,
  observeIdle,
} from "akasha/agent/seat/supervisor/seat-agent-idleness/modules/supervisor-idle-observe/supervisor-idle-observe.module.code.ts"
import {
  type DeferredRestartFireReason,
  type DeferredRestartState,
  decideDeferredRestart,
  INITIAL_DEFERRED_RESTART_STATE,
} from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-decide/supervisor-deferred-restart-decide.module.code.ts"
import {
  busyTrail,
  logPastCliffOverride,
} from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-log/supervisor-deferred-restart-log.module.code.ts"
import { readIdleBounded } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-probe/supervisor-deferred-restart-probe.module.code.ts"
import { guardTick } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-guard-tick/supervisor-guard-tick.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const TICK_MS = 10_000

export type FireCause = DeferredRestartFireReason | "past-cliff-override"

export function armDeferredRestart(opts: {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  getAgentId: () => string | null
  onIdle: (cause: FireCause) => void
  log?: (line: string) => void
  tickMs?: number
  maxDeferMs?: number
  staleWedgeMs?: number
  armedAtMs?: number
  observe?: () => Promise<IdleObservation>
  readTranscriptMtime?: () => number | null
  pastCliffOverride?: {
    cliffAgeMs: number
    getChildAgeMs: () => number | null
  }
  readBusyChildDetails?: () => Promise<readonly BusyChildDetail[]>
}): { cancel: () => void } {
  let state: DeferredRestartState = INITIAL_DEFERRED_RESTART_STATE
  let done = false
  let tickInFlight = false

  const tickMs = opts.tickMs ?? TICK_MS
  const observe = opts.observe ?? (() => observeIdle(opts))
  const ceilingTicks =
    opts.maxDeferMs !== undefined ? Math.max(1, Math.ceil(opts.maxDeferMs / tickMs)) : undefined
  const staleTicks =
    opts.staleWedgeMs !== undefined ? Math.max(1, Math.ceil(opts.staleWedgeMs / tickMs)) : undefined
  const armedAtMs = opts.armedAtMs ?? Date.now()
  const readTranscriptMtime =
    opts.readTranscriptMtime ??
    (() => {
      const id = opts.getAgentId()
      return id !== null ? readTranscriptMtimeMs(id) : null
    })
  const readBusyChildDetails =
    opts.readBusyChildDetails ?? (() => observeBusyChildDetails(opts.getClaudePid()))

  const trail = busyTrail(opts.log)

  const fireOnce = (cause: FireCause): undefined => {
    if (done) return
    done = true
    clearInterval(timer)
    if (ceilingTimer !== undefined) clearTimeout(ceilingTimer)
    if (cause === "idle") {
      opts.log?.("deferred-restart: agent idle — firing restart-now")
    } else if (cause === "past-cliff-override") {
      logPastCliffOverride(
        opts.pastCliffOverride?.getChildAgeMs() ?? null,
        readBusyChildDetails,
        opts.log
      )
    } else {
      const nowMs = Date.now()
      const frozenNote =
        cause === "stale-wedge"
          ? ` transcript frozen ~${Math.round((state.staleStreak * tickMs) / 1000)}s;`
          : ""
      trail.logFireWhileBusy(cause, Math.round((nowMs - armedAtMs) / 1000), frozenNote, nowMs)
    }
    opts.onIdle(cause)
  }

  const tick = async (): Promise<undefined> => {
    if (tickInFlight || done) return
    tickInFlight = true
    try {
      const observed = await readIdleBounded({ observe, tickMs })
      if (done) return
      const nowMs = Date.now()
      let idleNow = observed.idle
      let reason = observed.reason
      let overriding = false
      if (opts.pastCliffOverride !== undefined && observed.obs !== null && !observed.idle) {
        const age = opts.pastCliffOverride.getChildAgeMs()
        if (age !== null && age >= opts.pastCliffOverride.cliffAgeMs) {
          const verdict = pastCliffVerdict(observed.obs)
          idleNow = verdict.idle
          reason = verdict.reason
          overriding = idleNow
        }
      }
      let transcriptMtimeMs: number | null = null
      if (idleNow) {
        trail.reset()
      } else {
        transcriptMtimeMs = readTranscriptMtime()
        trail.record(reason, nowMs)
        trail.logBusy(reason, nowMs)
      }
      const result = decideDeferredRestart(
        state,
        { idle: idleNow, busyReason: reason, transcriptMtimeMs },
        { ceilingTicks, staleTicks }
      )
      state = result.state
      if (result.fire) {
        const cause: FireCause =
          overriding && (result.fireReason === "idle" || result.fireReason === null)
            ? "past-cliff-override"
            : (result.fireReason ?? (idleNow ? "idle" : "ceiling"))
        fireOnce(cause)
      }
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(
    () => guardTick(tick, (err) => opts.log?.(`deferred-restart: tick error: ${String(err)}`)),
    tickMs
  )
  timer.unref?.()

  const ceilingDelayMs =
    opts.maxDeferMs !== undefined
      ? Math.max(0, armedAtMs + opts.maxDeferMs - Date.now())
      : undefined
  const ceilingTimer =
    ceilingDelayMs !== undefined ? setTimeout(() => fireOnce("ceiling"), ceilingDelayMs) : undefined
  ceilingTimer?.unref?.()

  return {
    cancel: () => {
      done = true
      clearInterval(timer)
      if (ceilingTimer !== undefined) clearTimeout(ceilingTimer)
    },
  }
}
