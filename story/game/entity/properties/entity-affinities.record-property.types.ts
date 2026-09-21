import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { AffinityCounter } from "akasha/story/game/entity/properties/affinity-counter.number-property.types.ts"
import type { AffinityTier } from "akasha/story/game/entity/properties/affinity-tier.text-property.types.ts"
import type { AffinityType } from "akasha/story/game/entity/properties/affinity-type.text-property.types.ts"
import type { SheetEffect } from "akasha/story/game/entity/properties/sheet-effect.text-property.types.ts"
import type { SheetName } from "akasha/story/game/entity/properties/sheet-name.text-property.types.ts"
import type { SheetSource } from "akasha/story/game/entity/properties/sheet-source.text-property.types.ts"

export type EntityAffinities = List<{
  name: SheetName
  type: AffinityType
  tier: AffinityTier
  counter: AffinityCounter
  effect?: SheetEffect
  source?: SheetSource
}>
