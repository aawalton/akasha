import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { ListedRung } from "akasha/story/game/properties/listed-rung.text-property.types.ts"

export type TurnRungs = List<{
  name: ListedName
  rung: ListedRung
}>
