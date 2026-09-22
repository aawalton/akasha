import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"
import type { PoolChange } from "akasha/story/game/turn/properties/pool-change.number-property.types.ts"

export type PoolChanges = List<{
  name: ListedName
  change: PoolChange
}>
