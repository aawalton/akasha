import { whyOf } from "@akasha/command-system/fault-saying"
import { colorsOf } from "@akasha/seat-system/agent-turn-drawn"
import { colorOfState } from "@akasha/seat-system/seat-turn-color"
import { SEAT_TURN_STATES, type SeatTurnState } from "@akasha/seat-system/seat-turn-state"
import type { Answer, Given } from "../../modules/calling/calling.module.code.ts"

export const STATE = "--state"

export type Read =
  | { readonly agents: readonly string[] }
  | { readonly states: readonly SeatTurnState[] }
  | { readonly refused: readonly string[] }

export function statedAs(name: string): SeatTurnState | null {
  return SEAT_TURN_STATES.find((one) => one === name) ?? null
}

export function readIn(argv: readonly string[]): Read {
  const named: string[] = []
  const agents: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at] ?? ""
    if (word === STATE) {
      const said = argv[at + 1]
      if (said === undefined) {
        return { refused: [`\`${STATE}\` takes the name of a turn state after it`] }
      }
      named.push(said)
      at += 1
      continue
    }
    if (word.startsWith("-")) {
      return {
        refused: [`\`${word}\` is no word this takes — it takes agent ids, or \`${STATE} <name>\``],
      }
    }
    agents.push(word)
  }
  if (named.length > 0 && agents.length > 0) {
    return { refused: ["ask for agent ids or for turn states, never both in one call"] }
  }
  const states: SeatTurnState[] = []
  const unspelt: string[] = []
  for (const one of named) {
    const state = statedAs(one)
    if (state === null) unspelt.push(one)
    else states.push(state)
  }
  if (unspelt.length > 0) {
    return {
      refused: [
        `${unspelt.join(" ")} names no turn state; they are ${SEAT_TURN_STATES.join(", ")}`,
      ],
    }
  }
  if (states.length > 0) return { states }
  return { agents }
}

export type ColorOf = (state: SeatTurnState) => string | null

export function colorsOfStates(
  states: readonly SeatTurnState[],
  colorOf: ColorOf = colorOfState
): Record<string, string> {
  const colors: Record<string, string> = {}
  for (const state of states) {
    const color = colorOf(state)
    if (color !== null) colors[state] = color
  }
  return colors
}

export function colorsSaid(colors: Readonly<Record<string, string>>): string {
  return JSON.stringify({ colors })
}

export function agentTurnColors(argv: readonly string[], _given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    const colors = "states" in read ? colorsOfStates(read.states) : colorsOf(read.agents)
    return { report: [colorsSaid(colors)], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
