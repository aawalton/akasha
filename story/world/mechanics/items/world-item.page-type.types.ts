import type { ItemCategory } from "akasha/story/world/mechanics/items/properties/item-category.select-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldItem = WorldMechanic & {
  category?: ItemCategory
}
