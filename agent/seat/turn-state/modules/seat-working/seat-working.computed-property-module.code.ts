import {
  type SeatTurnState,
  TURN_STATE,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"

const WORKING: SeatTurnState = "working"

export const SEAT_WORKING = `${TURN_STATE}${WORKING}`

export type Seated = { readonly turnState?: unknown }

export function seatsWorking(seats: readonly Seated[]): boolean {
  return seats.some((one) => one.turnState === SEAT_WORKING)
}
