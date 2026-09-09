import { resolve } from "node:path"
import { whyOf } from "@akasha/command-system/fault-saying"
import {
  type SubagentPage,
  seatPageAt,
  subagentPagesStanding,
} from "@akasha/seat-system/agent-page-reading"
import { type ForestRow, readSeatForest } from "@akasha/seat-system/seat-forest"
import { colorOfState } from "@akasha/seat-system/seat-turn-color"
import {
  type SeatTurnReading,
  type SeatTurnState,
  seatTurnStateOf,
} from "@akasha/seat-system/seat-turn-state"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { readIn } from "./no-word-reading/no-word-reading.module.code.ts"

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

export function saidOf(forest: ForestSaid): string {
  return JSON.stringify(forest)
}

export async function agentForest(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return { report: [saidOf(forestOver(resolve(given.root), NOW))], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
