import type { Icon } from "akasha/page/properties/icon.text-property.types.ts"
import type { AlchemyEffects } from "akasha/temper/catalog/gear/temper-reagent/properties/alchemy-effects.multi-relation-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperReagent = TemperCatalogThing & {
  key: Key
  icon: Icon
  itemId: ItemId
  alchemyEffects: AlchemyEffects
}
