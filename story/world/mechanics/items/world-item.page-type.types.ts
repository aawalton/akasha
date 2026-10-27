import type { WorldItemCategory } from "akasha/story/world/mechanics/items/properties/world-item-category.select-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldItem = WorldMechanic & {
  category?: WorldItemCategory
}
