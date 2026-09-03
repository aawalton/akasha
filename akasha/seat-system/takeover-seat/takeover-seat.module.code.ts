import { ending } from "@akasha/utils-process/process-ending"
import { dataError, operationalError } from "@tools/lib/exit"
import { decideKillTarget } from "../kill-target-plan/kill-target-plan.module.code.ts"
import { scanProcEntries } from "../proc-scan/proc-scan.module.code.ts"
import { seatRecord } from "../seat-facts/seat-facts.module.code.ts"
import { resolveSeatTarget } from "../seat-handle/seat-handle.module.code.ts"
import { liveAgentPidsFromProc } from "../seat-proc-liveness/seat-proc-liveness.module.code.ts"
import { resolveSessionIdByAgentId } from "../seat-session-resolve/seat-session-resolve.module.code.ts"
import { SEAT_START_DIR } from "../supervising/supervisor-config/supervisor-config.module.code.ts"
import { materializeLocalTranscript } from "../transcript-materialize/transcript-materialize.module.code.ts"

export interface TakenSeat {
  readonly agentId: string
  readonly name: string | null
  readonly sessionId: string
  readonly tookOver: boolean
}

export async function resolveTakeoverTarget(target: string): Promise<string> {
  const resolved = resolveSeatTarget(target)
  if ("error" in resolved) throw dataError(resolved.error)
  return resolved.id
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
    await materializeLocalTranscript({ agentId, sessionId, cwd: SEAT_START_DIR })
  } catch (err) {
    process.stderr.write(
      `no stored transcript for agent ${agentId}; the resume may fail: ` +
        `${err instanceof Error ? err.message : String(err)}\n`
    )
  }

  return { agentId, name, sessionId, tookOver }
}
