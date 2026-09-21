import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { AffinityCounter } from "akasha/story/game/entity/properties/affinity-counter.number-property.types.ts"
import type { AffinityTier } from "akasha/story/game/entity/properties/affinity-tier.text-property.types.ts"
import type { AffinityType } from "akasha/story/game/entity/properties/affinity-type.text-property.types.ts"
import type { ListedEffect } from "akasha/story/game/entity/properties/listed-effect.text-property.types.ts"
import type { ListedSource } from "akasha/story/game/entity/properties/listed-source.text-property.types.ts"
import type { ListedName } from "akasha/story/game/properties/listed-name.text-property.types.ts"

export type EntityAffinities = List<{
  name: ListedName
  type: AffinityType
  tier: AffinityTier
  counter: AffinityCounter
  effect?: ListedEffect
  source?: ListedSource
}>
