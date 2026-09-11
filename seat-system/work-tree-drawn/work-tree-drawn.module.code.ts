import { colorOfState } from "akasha/seat-system/seat-turn-color/seat-turn-color.module.code.ts"
import { seatWorkNow } from "akasha/seat-system/seat-work/seat-work.module.code.ts"

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
