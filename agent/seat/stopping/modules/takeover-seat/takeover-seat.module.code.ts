import { materializeLocalTranscript } from "akasha/agent/claude-code/session/modules/transcript-materialize/transcript-materialize.module.code.ts"
import { liveAgentPidsFromProc } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agent/modules/proc-scan/proc-scan.module.code.ts"
import { seatRecord } from "akasha/agent/seat/fleet/modules/seat-facts/seat-facts.module.code.ts"
import { resolveSessionIdByAgentId } from "akasha/agent/seat/session/modules/resolve/seat-session-resolve.module.code.ts"
import { decideKillTarget } from "akasha/agent/seat/stopping/modules/kill-target-plan/kill-target-plan.module.code.ts"
import { SEAT_START_DIR } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  dataError,
  operationalError,
} from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { ending } from "akasha/code/process/modules/process-ending/process-ending.module.code.ts"

export interface TakenSeat {
  readonly agentId: string
  readonly name: string | null
  readonly sessionId: string
  readonly tookOver: boolean
}

async function stopHolder(pids: readonly number[], name: string | null): Promise<boolean> {
  const outcome = await ending(pids)
  if (!outcome.asked) return false
  if (!outcome.allGone) {
    throw operationalError(
      `supervisor process(es) ${pids.join(", ")} for '${name}' did not exit within the poll ` +
        "budget — not handing off to avoid two supervisors on one session"
    )
  }
  return true
}

export async function takeoverSeat(agentId: string): Promise<TakenSeat> {
  const sess = await resolveSessionIdByAgentId(agentId)
  if ("error" in sess) throw dataError(sess.error)
  const sessionId = sess.session

  const seat = seatRecord(agentId)
  const name = seat?.name ?? null
  const livePids = liveAgentPidsFromProc(scanProcEntries().entries)
  const killTarget = decideKillTarget({
    supervisorPid: seat?.supervisorPid ?? null,
    supervisorStands: seat?.presence === "present",
    procPidsForId: livePids.get(agentId) ?? [],
    seatName: name,
    selfPid: process.pid,
  })

  const tookOver = killTarget.kind === "signal" ? await stopHolder(killTarget.pids, name) : false

  try {
    materializeLocalTranscript({ agentId, sessionId, cwd: SEAT_START_DIR })
  } catch (err) {
    process.stderr.write(
      `no transcript on this workstation for agent ${agentId}; the resume may fail: ` +
        `${err instanceof Error ? err.message : String(err)}\n`
    )
  }

  return { agentId, name, sessionId, tookOver }
}
