import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { GateMultiplier } from "akasha/story/game/game-encounter/properties/gate-multiplier.number-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type EncounterGates = List<{
  name: ListedName
  multiplier: GateMultiplier
  note?: ListedNote
}>
