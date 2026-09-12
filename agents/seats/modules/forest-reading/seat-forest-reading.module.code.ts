import {
  type SubagentPage,
  seatPageAt,
  subagentPagesStanding,
} from "akasha/agents/page-reading/agent-page-reading.module.code.ts"
import {
  type ForestRow,
  readSeatForest,
} from "akasha/agents/seats/modules/forest/seat-forest.module.code.ts"
import { colorOfState } from "akasha/agents/seats/modules/turn-color/seat-turn-color.module.code.ts"
import {
  type SeatTurnReading,
  type SeatTurnState,
  seatTurnStateOf,
} from "akasha/seat-system/seat-turn-state/seat-turn-state.module.code.ts"

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
