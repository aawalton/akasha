import type { BusyChildDetail } from "../supervisor-idle-rule/supervisor-idle-rule.module.code.ts"

const BUSY_LOG_THROTTLE_MS = 60_000

const MAX_BUSY_HISTORY = 24

function fmtAgeMs(ageMs: number | null): string {
  if (ageMs === null) return "unknown"
  const totalMin = Math.round(ageMs / 60_000)
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  return h > 0 ? `~${h}h${String(m).padStart(2, "0")}m` : `~${m}m`
}

function fmtCmdline(cmdline: string): string {
  const max = 120
  return cmdline.length > max ? `${cmdline.slice(0, max)}…` : cmdline
}

export function logPastCliffOverride(
  ageMs: number | null,
  readBusyChildDetails: () => Promise<readonly BusyChildDetail[]>,
  log?: (line: string) => void
): undefined {
  const head =
    `deferred-restart: PAST-CLIFF OVERRIDE — claude child age ${fmtAgeMs(ageMs)} at/past ` +
    "the ~8h edge cliff (#15352); firing restart-now at turn boundary"
  void readBusyChildDetails()
    .then((kids) => {
      const kidList =
        kids.length === 0
          ? "<none readable>"
          : kids
              .map((k) => `[pid ${k.pid} age ${fmtAgeMs(k.ageMs)}: ${fmtCmdline(k.cmdline)}]`)
              .join(" ")
      log?.(`${head}, OVERRIDING ${kids.length} busy non-MCP child(ren): ${kidList}`)
    })
    .catch(() => {
      log?.(`${head}, and the overridden children could not be enumerated`)
    })
}

export interface BusyTrail {
  record: (reason: string, nowMs: number) => undefined
  reset: () => undefined
  logBusy: (reason: string, nowMs: number) => undefined
  logFireWhileBusy: (
    cause: string,
    deferredS: number,
    frozenNote: string,
    nowMs: number
  ) => undefined
}

export function busyTrail(log?: (line: string) => void): BusyTrail {
  const history: Array<{ reason: string; sinceMs: number }> = []
  let lastBusyReason: string | null = null
  let lastBusyLogAtMs = 0

  const render = (nowMs: number): string => {
    if (history.length === 0) return "<none>"
    return history
      .map(
        (h, i) =>
          `${h.reason} ${Math.round(((history[i + 1]?.sinceMs ?? nowMs) - h.sinceMs) / 1000)}s`
      )
      .join(" → ")
  }

  return {
    record: (reason, nowMs) => {
      const last = history[history.length - 1]
      if (last?.reason === reason) return
      history.push({ reason, sinceMs: nowMs })
      if (history.length > MAX_BUSY_HISTORY) history.shift()
    },

    reset: () => {
      lastBusyReason = null
      history.length = 0
    },

    logBusy: (reason, nowMs) => {
      if (reason !== lastBusyReason) {
        log?.(`deferred-restart: deferring restart — session busy (${reason})`)
        lastBusyReason = reason
        lastBusyLogAtMs = nowMs
        return
      }
      if (nowMs - lastBusyLogAtMs >= BUSY_LOG_THROTTLE_MS) {
        log?.(`deferred-restart: still deferring — session busy (${reason})`)
        lastBusyLogAtMs = nowMs
      }
    },

    logFireWhileBusy: (cause, deferredS, frozenNote, nowMs) => {
      log?.(
        `deferred-restart: FIRING restart-now WHILE BUSY — cause=${cause}, ` +
          `deferred ${deferredS}s;${frozenNote} busy-signal history: ${render(nowMs)}`
      )
    },
  }
}
