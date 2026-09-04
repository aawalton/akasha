import { seatNameForAgent } from "../seat-presence-read/seat-presence-read.module.code.ts"
import { colorOfState } from "../seat-turn-color/seat-turn-color.module.code.ts"
import { seatTurnStateOf } from "../seat-turn-state/seat-turn-state.module.code.ts"

export function colorDrawnFor(agent: string): string | null {
  if (seatNameForAgent(agent) === null) return null
  return colorOfState(seatTurnStateOf(agent).state)
}

export function colorsOf(
  agents: readonly string[],
  colorOf: (agent: string) => string | null = colorDrawnFor
): Record<string, string> {
  const found: Record<string, string> = {}
  for (const agent of agents) {
    const color = colorOf(agent)
    if (color !== null) found[agent] = color
  }
  return found
}
