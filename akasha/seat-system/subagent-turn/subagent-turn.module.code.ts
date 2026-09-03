import { existsSync } from "node:fs"
import { subagentPagePathFor } from "@tools/lib/subagent-page-read"
import {
  type SeatTurnReading,
  type SeatTurnState,
  seatTurnStateOf,
} from "../seat-turn-state/seat-turn-state.module.code.ts"
import { seatAbove } from "../subagent-naming/subagent-naming.module.code.ts"

const SEAT_GONE: SeatTurnState = "stopped"

export function subagentStands(agent: string): boolean {
  const page = subagentPagePathFor(agent)
  return page !== null && existsSync(page)
}

export function readSubagentTurn(stands: boolean, above: SeatTurnState): SeatTurnReading {
  if (!stands) return { state: "stopped", waitingOn: null }
  if (above === SEAT_GONE) return { state: "stopped", waitingOn: null }
  return { state: "working", waitingOn: null }
}

export function subagentTurnOf(agent: string): SeatTurnReading {
  const seat = seatAbove(agent)
  const above = seat === null ? SEAT_GONE : seatTurnStateOf(seat).state
  return readSubagentTurn(subagentStands(agent), above)
}
