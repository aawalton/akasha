import { shape } from "@tools/lib/shape"
import type { IdleRuleSource } from "@tools/lib/supervisor-idle-rule"
import { readProcessStartMs } from "@tools/lib/supervisor-precliff-restart"
import type { armDeferredRestart } from "../supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import type {
  DeferredRestartRuleSource,
  DeferredRestartWindows,
} from "../supervisor-deferred-restart-rule/supervisor-deferred-restart-rule.module.code.ts"

export interface IdleGateConfig {
  interruptMessage: string | null
  maxDeferMs?: number
  staleWedgeMs?: number
  armedAtMs?: number
  pastCliffOverride?: { cliffAgeMs: number; getChildAgeMs: () => number | null }
  isMaintenance?: boolean
}

export interface IdleGateArm {
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
  idleRule: IdleRuleSource
  deferredRestartRule: DeferredRestartRuleSource
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
      const { value: windows, notice } = await opts.deferredRestartRule.windows({
        maxDeferMs: shape.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_DEFER_MS),
        staleWedgeMs: shape
          .string()
          .optional()
          .parse(process.env.SUPERVISOR_DEFERRED_STALE_WEDGE_MS),
        preCliffOverrideMs: shape
          .string()
          .optional()
          .parse(process.env.SUPERVISOR_PRECLIFF_OVERRIDE_MS),
      })
      if (windows === null) {
        log(
          `Idle gate NOT armed for agent ${opts.getAgentId()} — the defer windows could not be read, ` +
            `so nothing would bound the arm: ${notice ?? "no reason given"}`
        )
        return null
      }
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
        idleRule: opts.idleRule,
        deferredRestartRule: opts.deferredRestartRule,
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
