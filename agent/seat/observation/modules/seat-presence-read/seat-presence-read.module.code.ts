import {
  akashaHolderProcessOf,
  akashaSeatIdForName,
  akashaSeatPathForAgent,
  akashaSeatSlugOf,
  akashaSeatsThatExist,
} from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import {
  parseSeatProcKey,
  type SeatPresence,
  statedProcessPresence,
} from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
export function seatPageAgents(): readonly string[] {
  return [...akashaSeatsThatExist().keys()].sort()
}

export function seatIdForName(name: string): string | null {
  return akashaSeatIdForName(name)
}

export function agentHolderProcess(agentId: string): string | null {
  return akashaHolderProcessOf(agentId)
}

export function agentPresence(agentId: string): SeatPresence {
  if (akashaSeatPathForAgent(agentId) === null) return "absent"
  return statedProcessPresence(akashaHolderProcessOf(agentId))
}

export function seatNameForAgent(agentId: string): string | null {
  if (agentId === "") return null
  return akashaSeatSlugOf(agentId)
}

export function seatNameForSupervisorPid(pid: number): string | null {
  for (const [agentId, name] of akashaSeatsThatExist()) {
    const stated = akashaHolderProcessOf(agentId)
    if (stated === null) continue
    const key = parseSeatProcKey(stated)
    if (key !== null && key.pid === pid) return name
  }
  return null
}
