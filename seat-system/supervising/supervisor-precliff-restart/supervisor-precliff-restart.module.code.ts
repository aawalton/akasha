import { statSync } from "node:fs"
import type {
  PreCliffObservation,
  PreCliffRestartRuleSource,
} from "@akasha/seat-system/supervisor-precliff-restart-rule"
import { requestedActionOf } from "../../seat-control/seat-control.module.code.ts"

const PRECLIFF_INTERVAL_MS = 60_000

export function readProcessStartMs(pid: number): number | null {
  const st = statSync(`/proc/${pid}`, { throwIfNoEntry: false })
  return st ? st.mtimeMs : null
}

async function readRequestedActionForSeat(agentId: string): Promise<string | null> {
  return requestedActionOf(agentId)
}

export function startPreCliffRestartMonitor(opts: {
  getClaudePid: () => number | null
  getAgentId: () => string | null
  isDeferredArmed: () => boolean
  armPreCliff: () => Promise<boolean>
  thresholdMs: number
  preCliffRestartRule: PreCliffRestartRuleSource
  log: (line: string) => void
  tickMs?: number
  now?: () => number
  readStartMs?: (pid: number) => number | null
  readRequestedAction?: (agentId: string) => Promise<string | null>
}): { stop: () => void } {
  const clock = opts.now ?? Date.now
  const tickMs = opts.tickMs ?? PRECLIFF_INTERVAL_MS
  const readStartMs = opts.readStartMs ?? readProcessStartMs
  const readRequestedAction = opts.readRequestedAction ?? readRequestedActionForSeat

  let armedForPid: number | null = null
  let tickInFlight = false

  async function runTick(): Promise<void> {
    const pid = opts.getClaudePid()
    if (pid === null) return
    if (armedForPid !== null && armedForPid !== pid) armedForPid = null
    const alreadyArmed = armedForPid === pid
    if (alreadyArmed) return

    const startMs = readStartMs(pid)
    const childAgeMs = startMs === null ? null : clock() - startMs

    if (childAgeMs === null || childAgeMs < opts.thresholdMs) return

    const agentId = opts.getAgentId()
    let deferredOrActionPending = opts.isDeferredArmed()
    if (!deferredOrActionPending && agentId !== null) {
      deferredOrActionPending = (await readRequestedAction(agentId)) !== null
    }

    const obs: PreCliffObservation = {
      childAgeMs,
      alreadyArmed: false,
      deferredOrActionPending,
    }
    const { value: verdict } = await opts.preCliffRestartRule(obs, opts.thresholdMs)
    if (verdict !== "arm") return

    if (await opts.armPreCliff()) {
      armedForPid = pid
      opts.log(
        `pre-cliff: claude child (pid ${pid}) reached ~${Math.round(childAgeMs / 3_600_000)}h ` +
          `age — armed idle-gated restart-now to pre-empt the edge-connection cliff (#15352)`
      )
    }
  }

  async function tick(): Promise<void> {
    if (tickInFlight) return
    tickInFlight = true
    try {
      await runTick()
    } catch (err) {
      opts.log(`pre-cliff: tick error: ${String(err)}`)
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(() => void tick(), tickMs)
  timer.unref?.()
  return { stop: () => clearInterval(timer) }
}
