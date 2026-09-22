import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { DerivedNumber } from "akasha/story/game/turn/properties/derived-number.number-property.types.ts"

export type TurnDerived = List<{
  name: ListedName
  number: DerivedNumber
}>
