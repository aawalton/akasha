import { seatRecord } from "akasha/agent/seat/fleet/modules/seat-facts/seat-facts.module.code.ts"
import { decideSubagentGuard } from "akasha/agent/subagent/modules/guard/subagent-guard.module.code.ts"
import { standingSubagentsOf } from "akasha/agent/subagent/modules/page/subagent-page.module.code.ts"
import { inputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"

export function holdsLive(agentId: string): boolean {
  const seat = seatRecord(agentId)
  return seat !== null && seat.presence !== "absent"
}

export function refuseWhereSubagentsWork(agentId: string, force: boolean): undefined {
  const seat = seatRecord(agentId)
  const guard = decideSubagentGuard({
    standing: standingSubagentsOf(agentId),
    targetLive: holdsLive(agentId),
    force,
    seatName: seat?.name ?? agentId,
    act: "Restarting",
  })
  if (guard.kind === "reject") throw inputError(guard.reason)
  return undefined
}
