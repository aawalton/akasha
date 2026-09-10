import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"
import { buildReExecArgv } from "../../supervising/supervisor-args/supervisor-args.module.code.ts"
import {
  LOG,
  REPO_ROOT,
} from "../../supervising/supervisor-config/supervisor-config.module.code.ts"
import {
  ORIGINAL_ARGV,
  SELF_HEAL_STATE,
} from "../supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"

export function resolveReExecArgv(): readonly string[] {
  const agentId = SELF_HEAL_STATE.currentAgentIdForSelfHeal
  const sessionId = SELF_HEAL_STATE.currentSessionIdForSelfHeal
  if (agentId == null || sessionId == null) return ORIGINAL_ARGV
  return buildReExecArgv({ originalArgv: ORIGINAL_ARGV, agentId, sessionId })
}

export function requestReExec(why: string): undefined {
  if (SELF_HEAL_STATE.pendingReExec) return
  SELF_HEAL_STATE.pendingReExec = true
  try {
    SELF_HEAL_STATE.killSelf("SIGTERM")
    console.log(`${LOG} Re-exec: SIGTERM sent to self (${why})`)
  } catch (err) {
    SELF_HEAL_STATE.pendingReExec = false
    SELF_HEAL_STATE.reExecScheduled = false
    console.error(`${LOG} Re-exec: failed to SIGTERM self (${why}):`, err)
  }
}

export function requestSelfHealRestart(newVersion: string): undefined {
  requestReExec(`version ${newVersion}`)
}

export async function handleVersionUpdate(
  data: { liveVersion: string; deployedAt: number } | null
): Promise<undefined> {
  if (data?.liveVersion == null) return
  if (SELF_HEAL_STATE.initialSupervisorVersion === null) {
    SELF_HEAL_STATE.initialSupervisorVersion = data.liveVersion
    console.log(`${LOG} Supervisor version marker initialized: ${data.liveVersion}`)
    return
  }
  if (data.liveVersion === SELF_HEAL_STATE.initialSupervisorVersion) return
  if (SELF_HEAL_STATE.pendingReExec || SELF_HEAL_STATE.reExecScheduled) return
  if (SELF_HEAL_STATE.installInFlight) return
  SELF_HEAL_STATE.installInFlight = true
  const newVersion = data.liveVersion
  console.log(
    `${LOG} New supervisor version detected: ${SELF_HEAL_STATE.initialSupervisorVersion} -> ${newVersion}; running single-flight bun install in ${REPO_ROOT}`
  )
  try {
    const result = await SELF_HEAL_STATE.runInstall(newVersion)
    if (!result.ok) {
      console.error(
        `${LOG} Self-heal: bun install failed; staying on current image. stderr:\n${result.stderr}`
      )
      return
    }
    SELF_HEAL_STATE.reExecScheduled = true
    console.log(
      `${LOG} Self-heal: bun install succeeded; deferring re-exec until agent idle (or max-defer ceiling)`
    )
    const { value: windows, notice } = await SELF_HEAL_STATE.deferredRestartRuleForSelfHeal.windows(
      {
        maxDeferMs: shape.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_DEFER_MS),
        staleWedgeMs: undefined,
        preCliffOverrideMs: undefined,
      }
    )
    if (windows === null) {
      SELF_HEAL_STATE.reExecScheduled = false
      console.error(
        `${LOG} Self-heal: re-exec NOT armed — the max-defer ceiling could not be read, so ` +
          `nothing would bound the deferral: ${notice ?? "no reason given"}`
      )
      return
    }
    SELF_HEAL_STATE.deferredReExecGate = SELF_HEAL_STATE.armReExecGate({
      maxDeferMs: windows.maxDeferMs,
      onIdle: async () => {
        SELF_HEAL_STATE.deferredReExecGate = null
        const { value: delayMs } = await SELF_HEAL_STATE.selfHealJitterRuleForSelfHeal(
          SELF_HEAL_STATE.randomFloat(),
          shape.string().optional().parse(process.env.SUPERVISOR_REEXEC_MAX_JITTER_MS)
        )
        console.log(
          `${LOG} Self-heal: agent idle; scheduling re-exec SIGTERM in ${delayMs}ms (jitter)`
        )
        SELF_HEAL_STATE.scheduleReExec(() => requestSelfHealRestart(newVersion), delayMs)
      },
    })
  } finally {
    SELF_HEAL_STATE.installInFlight = false
  }
}
