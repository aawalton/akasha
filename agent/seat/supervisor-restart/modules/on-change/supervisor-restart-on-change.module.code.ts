import { buildReExecArgv } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-args/supervisor-args.module.code.ts"
import {
  LOG,
  REPO_ROOT,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  ORIGINAL_ARGV,
  SUPERVISOR_RESTART_STATE,
} from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

export function resolveReExecArgv(): readonly string[] {
  const agentId = SUPERVISOR_RESTART_STATE.currentAgentIdForSelfHeal
  const sessionId = SUPERVISOR_RESTART_STATE.currentSessionIdForSelfHeal
  if (agentId == null || sessionId == null) return ORIGINAL_ARGV
  return buildReExecArgv({ originalArgv: ORIGINAL_ARGV, agentId, sessionId })
}

function requestReExec(why: string): undefined {
  if (SUPERVISOR_RESTART_STATE.pendingReExec) return
  SUPERVISOR_RESTART_STATE.pendingReExec = true
  try {
    SUPERVISOR_RESTART_STATE.killSelf("SIGTERM")
    console.log(`${LOG} Re-exec: SIGTERM sent to self (${why})`)
  } catch (err) {
    SUPERVISOR_RESTART_STATE.pendingReExec = false
    SUPERVISOR_RESTART_STATE.reExecScheduled = false
    console.error(`${LOG} Re-exec: failed to SIGTERM self (${why}):`, err)
  }
}

function requestSupervisorRestart(newVersion: string): undefined {
  requestReExec(`version ${newVersion}`)
}

export async function handleVersionUpdate(
  data: { liveVersion: string; deployedAt: number } | null
): Promise<undefined> {
  if (data?.liveVersion == null) return
  if (SUPERVISOR_RESTART_STATE.initialSupervisorVersion === null) {
    SUPERVISOR_RESTART_STATE.initialSupervisorVersion = data.liveVersion
    console.log(`${LOG} Supervisor version marker initialized: ${data.liveVersion}`)
    return
  }
  if (data.liveVersion === SUPERVISOR_RESTART_STATE.initialSupervisorVersion) return
  if (SUPERVISOR_RESTART_STATE.pendingReExec || SUPERVISOR_RESTART_STATE.reExecScheduled) return
  if (SUPERVISOR_RESTART_STATE.installInFlight) return
  SUPERVISOR_RESTART_STATE.installInFlight = true
  const newVersion = data.liveVersion
  console.log(
    `${LOG} New supervisor version detected: ${SUPERVISOR_RESTART_STATE.initialSupervisorVersion} -> ${newVersion}; running single-flight bun install in ${REPO_ROOT}`
  )
  try {
    const result = await SUPERVISOR_RESTART_STATE.runInstall(newVersion)
    if (!result.ok) {
      console.error(
        `${LOG} Self-heal: bun install failed; staying on current image. stderr:\n${result.stderr}`
      )
      return
    }
    SUPERVISOR_RESTART_STATE.reExecScheduled = true
    console.log(
      `${LOG} Self-heal: bun install succeeded; deferring re-exec until agent idle (or max-defer ceiling)`
    )
    const { value: windows, notice } =
      await SUPERVISOR_RESTART_STATE.deferredRestartRuleForSelfHeal.windows({
        maxDeferMs: SHAPE.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_DEFER_MS),
        staleWedgeMs: undefined,
        preCliffOverrideMs: undefined,
      })
    if (windows === null) {
      SUPERVISOR_RESTART_STATE.reExecScheduled = false
      console.error(
        `${LOG} Self-heal: re-exec NOT armed — the max-defer ceiling could not be read, so ` +
          `nothing would bound the deferral: ${notice ?? "no reason given"}`
      )
      return
    }
    SUPERVISOR_RESTART_STATE.deferredReExecGate = SUPERVISOR_RESTART_STATE.armReExecGate({
      maxDeferMs: windows.maxDeferMs,
      onIdle: async () => {
        SUPERVISOR_RESTART_STATE.deferredReExecGate = null
        const { value: delayMs } = await SUPERVISOR_RESTART_STATE.selfHealJitterRuleForSelfHeal(
          SUPERVISOR_RESTART_STATE.randomFloat(),
          SHAPE.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_JITTER_MS)
        )
        console.log(
          `${LOG} Self-heal: agent idle; scheduling re-exec SIGTERM in ${delayMs}ms (jitter)`
        )
        SUPERVISOR_RESTART_STATE.scheduleReExec(() => requestSupervisorRestart(newVersion), delayMs)
      },
    })
  } finally {
    SUPERVISOR_RESTART_STATE.installInFlight = false
  }
}
