import { inputError } from "@akasha/errors-core/exit-code"
import { ending } from "@akasha/utils-process/process-ending"
import { decideKillTarget } from "../kill-target-plan/kill-target-plan.module.code.ts"
import { killSeatSession } from "../launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { scanProcEntries } from "../proc-scan/proc-scan.module.code.ts"
import { seatRecord } from "../seat-facts/seat-facts.module.code.ts"
import { removeSeatPage } from "../seat-page-writing/seat-page-writing.module.code.ts"
import { liveAgentPidsFromProc } from "../seat-proc-liveness/seat-proc-liveness.module.code.ts"
import { decideSubagentGuard } from "../subagent-guard/subagent-guard.module.code.ts"
import {
  removeSubagentPagesOf,
  standingSubagentsOf,
} from "../subagent-page/subagent-page.module.code.ts"

export const SEAT_STOP_STATUSES = ["stopped", "already-exited", "reconciled"] as const

export type SeatStopStatus = (typeof SEAT_STOP_STATUSES)[number]

export interface SeatStopSaying {
  readonly acting: string
  readonly ended: string
  readonly took: string
}

export const A_STOP: SeatStopSaying = {
  acting: "Stopping",
  ended: "was stopped",
  took: "a deliberate stop",
}

export const A_RESET: SeatStopSaying = {
  acting: "Resetting",
  ended: "was reset",
  took: "a reset",
}

export interface StopSeatInput {
  readonly agentId: string
  readonly force: boolean
  readonly saying: SeatStopSaying
}

export interface SeatStopped {
  readonly agentId: string
  readonly name: string | null
  readonly pid: number | null
  readonly signaled: boolean
  readonly status: SeatStopStatus
}

export async function stopSeat(input: StopSeatInput): Promise<SeatStopped> {
  const { agentId, force, saying } = input
  const seat = seatRecord(agentId)
  const name = seat?.name ?? null

  const guard = decideSubagentGuard({
    standing: standingSubagentsOf(agentId),
    targetLive: seat !== null && seat.presence !== "absent",
    force,
    seatName: name ?? agentId,
    act: saying.acting,
  })
  if (guard.kind === "reject") throw inputError(guard.reason)

  removeSubagentPagesOf(agentId, saying.ended)

  const livePids = liveAgentPidsFromProc(scanProcEntries().entries)
  const target = decideKillTarget({
    supervisorPid: seat?.supervisorPid ?? null,
    supervisorStands: seat?.presence === "present",
    procPidsForId: livePids.get(agentId) ?? [],
    seatName: name,
    selfPid: process.pid,
  })
  switch (target.kind) {
    case "signal": {
      const outcome = await ending(target.pids)
      if (outcome.allGone) removeSeatPage(agentId, `${saying.took} reached it`)
      return {
        agentId,
        name,
        pid: target.pids[0] ?? null,
        signaled: outcome.asked,
        status: "stopped",
      }
    }
    case "session": {
      const ended = await killSeatSession(target.name)
      removeSeatPage(
        agentId,
        ended ? `${saying.took} ended its session` : "no session stood for it"
      )
      return {
        agentId,
        name,
        pid: null,
        signaled: ended,
        status: ended ? "stopped" : "already-exited",
      }
    }
    case "reconcile":
      removeSeatPage(agentId, "no live supervisor stood for it")
      return { agentId, name, pid: null, signaled: false, status: "reconciled" }
  }
}
