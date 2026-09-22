import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Recipes } from "akasha/temper/catalog/gear/temper-potion-crafted/properties/recipes.record-property.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/gear/thing/properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "akasha/temper/catalog/gear/thing/properties/potion-seconds.number-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperPotionCrafted = TemperGearThing & {
  key: Key
  description: Description
  icon: Icon
  level: ItemLevel
  seconds: PotionSeconds
  recipes: Recipes
}
