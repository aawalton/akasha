import {
  type SubagentPage,
  seatPageAt,
  subagentPagesStanding,
} from "akasha/agent/modules/page-reading/agent-page-reading.module.code.ts"
import {
  type ForestRow,
  readSeatForest,
} from "akasha/agent/seat/fleet/modules/seat-forest/seat-forest.module.code.ts"
import { colorOfState } from "akasha/agent/seat/observation/seat-turn/modules/color/seat-turn-color.module.code.ts"
import type {
  SeatTurnReading,
  SeatTurnState,
} from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { seatTurnStateOf } from "akasha/agent/seat/observation/seat-turn/modules/state/seat-turn-state.module.code.ts"

export type ForestSeat = ForestRow & {
  readonly state: SeatTurnState
  readonly waitingOn: string | null
  readonly color: string | null
  readonly at: string | null
}

export type ForestSaid = {
  readonly repo: string
  readonly rows: readonly ForestSeat[]
  readonly subagents: readonly SubagentPage[]
}

export type Reading = {
  readonly forest: () => readonly ForestRow[]
  readonly turn: (agentId: string) => SeatTurnReading
  readonly color: (state: SeatTurnState, root: string) => string | null
  readonly pageAt: (agentId: string, root: string) => string | null
  readonly subagents: (root: string) => readonly SubagentPage[]
}

export const NOW: Reading = {
  forest: readSeatForest,
  turn: seatTurnStateOf,
  color: colorOfState,
  pageAt: seatPageAt,
  subagents: subagentPagesStanding,
}

export function forestOver(repo: string, reading: Reading): ForestSaid {
  const rows = reading.forest().map((row) => {
    const turn = reading.turn(row.id)
    return {
      ...row,
      state: turn.state,
      waitingOn: turn.waitingOn,
      color: reading.color(turn.state, repo),
      at: reading.pageAt(row.id, repo),
    }
  })
  return { repo, rows, subagents: reading.subagents(repo) }
}
