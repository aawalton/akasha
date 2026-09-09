import { initiativeOf } from "../seat-initiative/seat-initiative.module.code.ts"
import { seatPageAgents } from "../seat-presence-read/seat-presence-read.module.code.ts"
import { colorOfState } from "../seat-turn-color/seat-turn-color.module.code.ts"
import {
  SEAT_TURN_STATES,
  type SeatTurnState,
  seatTurnStateOf,
} from "../seat-turn-state/seat-turn-state.module.code.ts"

export interface SeatHolding {
  readonly initiative: string | null
  readonly state: SeatTurnState
  readonly color: string | null
}

export interface SeatWork {
  readonly byInitiative: ReadonlyMap<string, SeatTurnState>
}

const RANKED: readonly string[] = ["green", "blue", "yellow"]

function rankOf(color: string | null): number {
  if (color === null) return RANKED.length
  const at = RANKED.indexOf(color)
  return at === -1 ? RANKED.length : at
}

function firstStated(a: SeatHolding, b: SeatHolding): SeatHolding {
  return SEAT_TURN_STATES.indexOf(a.state) <= SEAT_TURN_STATES.indexOf(b.state) ? a : b
}

export function louder(a: SeatHolding, b: SeatHolding): SeatHolding {
  const apart = rankOf(a.color) - rankOf(b.color)
  if (apart !== 0) return apart < 0 ? a : b
  return firstStated(a, b)
}

function keep(into: Map<string, SeatHolding>, one: SeatHolding): undefined {
  if (one.initiative === null) return undefined
  const kept = into.get(one.initiative)
  into.set(one.initiative, kept === undefined ? one : louder(kept, one))
  return undefined
}

export function foldSeatWork(held: readonly SeatHolding[]): SeatWork {
  const loudest = new Map<string, SeatHolding>()
  for (const one of held) {
    keep(loudest, one)
  }
  const byInitiative = new Map<string, SeatTurnState>()
  for (const [key, one] of loudest) {
    byInitiative.set(key, one.state)
  }
  return { byInitiative }
}

export function seatHoldingsNow(): readonly SeatHolding[] {
  return seatPageAgents().map((agent) => {
    const state = seatTurnStateOf(agent).state
    return { initiative: initiativeOf(agent)?.value ?? null, state, color: colorOfState(state) }
  })
}

export function seatWorkNow(): SeatWork {
  return foldSeatWork(seatHoldingsNow())
}
