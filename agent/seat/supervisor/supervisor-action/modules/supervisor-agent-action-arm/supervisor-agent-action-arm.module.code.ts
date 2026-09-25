import type { armDeferredRestart } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import {
  type DeferredRestartWindows,
  resolveDeferredRestartWindows,
} from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-decide/supervisor-deferred-restart-decide.module.code.ts"
import { readProcessStartMs } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-precliff-restart/supervisor-precliff-restart.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

interface IdleGateConfig {
  interruptMessage: string | null
  maxDeferMs?: number
  staleWedgeMs?: number
  armedAtMs?: number
  pastCliffOverride?: { cliffAgeMs: number; getChildAgeMs: () => number | null }
  isMaintenance?: boolean
}

interface IdleGateArm {
  armIdleGate: (
    build: (windows: DeferredRestartWindows) => IdleGateConfig
  ) => Promise<DeferredRestartWindows | null>
  armPreCliffRestart: () => Promise<boolean>
  isArming: () => boolean
}

export function buildIdleGateArm(opts: {
  deferredRestart: { cancel: (() => void) | null }
  fire: (interruptMessage: string | null, maintenance: boolean) => Promise<undefined>
  armDeferred: typeof armDeferredRestart
  getClaudePid: () => number
  getProxyPort: () => number
  getAgentId: () => string | null
  log: (line: string) => void
}): IdleGateArm {
  const { deferredRestart, log } = opts
  let idleGateArming = false

  const armIdleGate = async (
    build: (windows: DeferredRestartWindows) => IdleGateConfig
  ): Promise<DeferredRestartWindows | null> => {
    if (deferredRestart.cancel !== null || idleGateArming) return null
    idleGateArming = true
    try {
      const windows = resolveDeferredRestartWindows({
        maxDeferMs: SHAPE.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_DEFER_MS),
        staleWedgeMs: SHAPE.string()
          .optional()
          .parse(process.env.SUPERVISOR_DEFERRED_STALE_WEDGE_MS),
        preCliffOverrideMs: SHAPE.string()
          .optional()
          .parse(process.env.SUPERVISOR_PRECLIFF_OVERRIDE_MS),
      })
      const cfg = build(windows)
      const { cancel } = opts.armDeferred({
        getClaudePid: opts.getClaudePid,
        getProxyPort: opts.getProxyPort,
        getAgentId: opts.getAgentId,
        onIdle: (cause) =>
          opts.fire(cfg.interruptMessage, cfg.isMaintenance === true && cause === "idle"),
        maxDeferMs: cfg.maxDeferMs,
        staleWedgeMs: cfg.staleWedgeMs,
        armedAtMs: cfg.armedAtMs ?? Date.now(),
        pastCliffOverride: cfg.pastCliffOverride,
        log,
      })
      deferredRestart.cancel = cancel
      return windows
    } finally {
      idleGateArming = false
    }
  }

  const armPreCliffRestart = async (): Promise<boolean> => {
    const windows = await armIdleGate((w) => ({
      interruptMessage: null,
      isMaintenance: true,
      pastCliffOverride: {
        cliffAgeMs: w.preCliffOverrideMs,
        getChildAgeMs: () => {
          const startMs = readProcessStartMs(opts.getClaudePid())
          return startMs === null ? null : Date.now() - startMs
        },
      },
    }))
    if (windows === null) return false
    log(
      `Pre-cliff self-restart armed for agent ${opts.getAgentId()} — idle gate ` +
        `(busyChildren override past ${Math.round(windows.preCliffOverrideMs / 60_000)}m child age)`
    )
    return true
  }

  return { armIdleGate, armPreCliffRestart, isArming: () => idleGateArming }
}
