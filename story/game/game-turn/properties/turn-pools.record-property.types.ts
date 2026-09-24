import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { PoolChange } from "akasha/story/game/game-turn/properties/pool-change.number-property.types.ts"
import type { PoolMost } from "akasha/story/game/game-turn/properties/pool-most.number-property.types.ts"
import type { PoolNow } from "akasha/story/game/game-turn/properties/pool-now.number-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"

export type TurnPools = List<{
  name: ListedName
  now: PoolNow
  most?: PoolMost
  change?: PoolChange
}>
