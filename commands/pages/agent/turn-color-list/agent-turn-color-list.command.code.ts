import { colorsOf } from "akasha/agents/modules/turn-drawn/agent-turn-drawn.module.code.ts"
import { colorOfState } from "akasha/agents/seats/modules/turn-color/seat-turn-color.module.code.ts"
import {
  SEAT_TURN_STATES,
  type SeatTurnState,
} from "akasha/agents/seats/modules/turn-state/seat-turn-state.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { agent as agentArgument } from "akasha/commands/arguments/pages/agent.argument.ts"
import { turnState } from "akasha/commands/arguments/pages/turn-state.argument.ts"
import { faulted, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { agentTurnColorList as page } from "akasha/commands/pages/agent/turn-color-list/agent-turn-color-list.command.ts"

const NAMED = [agentArgument, turnState]

export function statedAs(name: string): SeatTurnState | null {
  return SEAT_TURN_STATES.find((one) => one === name) ?? null
}

export function wrongIn(named: readonly string[]): string | null {
  const unspelt = named.filter((one) => statedAs(one) === null)
  if (unspelt.length === 0) return null
  return `${unspelt.join(" ")} names no turn state; they are ${SEAT_TURN_STATES.join(", ")}`
}

function statesIn(named: readonly string[]): readonly SeatTurnState[] {
  return named.flatMap((one) => {
    const state = statedAs(one)
    return state === null ? [] : [state]
  })
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

export function agentTurnColorList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const wrong = wrongIn(taken.turnState)
  if (wrong !== null) return mistaking([wrong])
  const states = statesIn(taken.turnState)
  try {
    const colors = states.length > 0 ? colorsOfStates(states) : colorsOf(taken.agent)
    return told([colorsSaid(colors)])
  } catch (thrown) {
    return faulted(thrown)
  }
}
