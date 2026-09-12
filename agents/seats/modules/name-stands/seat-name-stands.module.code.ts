import {
  composeSeatName,
  movesWithTheAttributes,
  type NameableSeat,
} from "akasha/agents/seats/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { composedNameOf } from "akasha/agents/seats/modules/rename/seat-rename.module.code.ts"
import { lowerUuid } from "akasha/pages/name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"

export function nameStanding(agent: string, root: string, next: NameableSeat): string | null {
  if (!lowerUuid(agent.toLowerCase())) return null
  const held = composedNameOf(agent)
  if (held !== null && !movesWithTheAttributes(held, root)) return held
  return composeSeatName(next, root) ?? held
}
