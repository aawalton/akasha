import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"
import {
  type SeatTurnReading,
  seatTurnStateOf,
} from "../seat-turn-state/seat-turn-state.module.code.ts"
import { seatAbove } from "../subagent-naming/subagent-naming.module.code.ts"
import { subagentStands, subagentTurnOf } from "../subagent-turn/subagent-turn.module.code.ts"

export function agentTurnStateOf(agent: string): SeatTurnReading {
  return seatAbove(agent) === null ? seatTurnStateOf(agent) : subagentTurnOf(agent)
}

export function agentStands(agent: string): boolean {
  return seatAbove(agent) === null ? seatNameForAgent(agent) !== null : subagentStands(agent)
}
