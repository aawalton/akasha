import { seatWorkNow } from "akasha/agents/seats/modules/work/seat-work.module.code.ts"
import { colorOfState } from "akasha/seat-system/seat-turn-color/seat-turn-color.module.code.ts"

export interface Drawn {
  readonly byInitiative: ReadonlyMap<string, string>
}

export function drawnNow(): Drawn {
  const work = seatWorkNow()
  const byInitiative = new Map<string, string>()
  for (const [key, state] of work.byInitiative) {
    const color = colorOfState(state)
    if (color !== null) byInitiative.set(key, color)
  }
  return { byInitiative }
}
