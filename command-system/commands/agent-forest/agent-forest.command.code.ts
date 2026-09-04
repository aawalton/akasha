import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
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

export type Read = { readonly asked: true } | { readonly refused: readonly string[] }

// A SEAT AS THE ANSWER CARRIES IT: what the forest row says of the seat's page, and what the seat
// itself is doing beside it. The four added keys are on every row, so a caller reads a state and a
// color off each seat rather than telling an absent key from a null one.
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

// THE FIVE READS THE ANSWER IS COMPOSED FROM, named here so a check can drive the composing from
// seeded ones. Which seats are there and what each of them is doing changes between one call and
// the next, so a check asking the live fleet would agree with whatever it was handed and would
// prove nothing about the join.
export type Reading = {
  readonly forest: () => readonly ForestRow[]
  readonly turn: (agentId: string) => SeatTurnReading
  readonly color: (state: SeatTurnState, root: string) => string | null
  readonly pageAt: (agentId: string, root: string) => string | null
  readonly subagents: (root: string) => readonly SubagentPage[]
}

// The live fleet. `colorOfState` takes the checkout as its second argument, so the root threaded
// through here is the one every part of the answer was read against — which is what `repo` claims
// of itself, and would be a lie if the colors came off a checkout of their own.
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

export function readIn(argv: readonly string[]): Read {
  const refusals = argv.map((one) => `\`${one}\` is no word this takes — it takes no word at all`)
  if (refusals.length > 0) return { refused: refusals }
  return { asked: true }
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
