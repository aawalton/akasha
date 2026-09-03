import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { colorsOf } from "@tools/lib/agent-turn-drawn"
import { colorOfState } from "@tools/lib/seat-turn-color"
import { SEAT_TURN_STATES, type SeatTurnState } from "@tools/lib/seat-turn-state"

export const STATE = "--state"

// WHAT ONE CALL ASKED FOR. Ids and states are never asked for together, so this is one or the
// other rather than a record carrying both: the key a color is filed under is then one thing, and
// a caller reading the answer never has to work out which sort of key it is looking at.
export type Read =
  | { readonly agents: readonly string[] }
  | { readonly states: readonly SeatTurnState[] }
  | { readonly refused: readonly string[] }

export function statedAs(name: string): SeatTurnState | null {
  return SEAT_TURN_STATES.find((one) => one === name) ?? null
}

// The words of one call read into what it asked for. A word is refused where it was met, so the
// first fault along the line is the one reported, which is what the loose file this carries did.
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
  // A NAME NO TURN STATE CARRIES IS REFUSED RATHER THAN LEFT OUT, where an id nothing knows about
  // is left out and not refused. A caller asking by state knows what it asked; a caller asking by
  // id may be asking about a terminal that turned out to hold no seat, and wants no color back.
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

// The color each state named is drawn in. A state whose page names no color is left out rather
// than answered an empty name, which is what an agent no color could be read for gets too.
//
// The reader is a parameter so a test can drive this without a checkout, and so the arm that does
// reach the real one is the arm that proves `@tools/lib/seat-turn-color` resolves.
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

// The whole of what goes back: one JSON object carrying a `colors` record, and nothing else.
export function colorsSaid(colors: Readonly<Record<string, string>>): string {
  return JSON.stringify({ colors })
}

// THE ROOT IS NOT TAKEN FROM `given`, and that is deliberate. `colorsOf` reads the agents' own
// records and takes no root at all, and `colorOfState` reaches the checkout `akashaRoot()` names
// on its own. Handing `given.root` to the state road alone would let one call read two different
// checkouts, so both roads keep reaching the root each reached before this was a command.
//
// NOTHING IS KEPT BETWEEN CALLS. `colorOfState` opens the state's page every time it is asked,
// because the verb server answers this from one long-lived process: a color rewritten under that
// process is the color it must next answer, and a value kept here would answer the old one.
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
