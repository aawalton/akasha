import type { Collectibles } from "akasha/temper/catalog/pursuit/temper-collectible-category/properties/collectibles.page-property-entry.types.ts"
import type { EsoCategoryIndex } from "akasha/temper/catalog/pursuit/temper-collectible-category/properties/eso-category-index.number-property.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/pursuit/thing/temper-pursuit-thing.page-type.types.ts"
import type { Parent } from "akasha/temper/thing/properties/parent.text-property.types.ts"

export type TemperCollectibleCategory = TemperPursuitThing & {
  esoCategoryIndex?: EsoCategoryIndex
  collectibles?: Collectibles
  parent?: Parent
}
