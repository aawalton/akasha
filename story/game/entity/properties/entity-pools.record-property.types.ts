import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { PoolNow } from "akasha/story/game/entity/properties/pool-now.number-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"

export type EntityPools = List<{
  name: ListedName
  now: PoolNow
}>
