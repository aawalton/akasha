import type { EsoLoreCategoryId } from "akasha/temper/catalog/pursuit/temper-lore-collection/properties/eso-lore-category-id.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"

export type TemperLoreCategory = TemperPursuitThing & {
  esoLoreCategoryId: EsoLoreCategoryId
}
