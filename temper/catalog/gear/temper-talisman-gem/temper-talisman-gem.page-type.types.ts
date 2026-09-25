import type { GemSource } from "akasha/temper/catalog/gear/temper-talisman-gem/properties/gem-source.text-property.types.ts"
import type { SocketedInto } from "akasha/temper/catalog/gear/temper-talisman-gem/properties/socketed-into.relation-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperTalismanGem = TemperCatalogThing & {
  itemId: ItemId
  socketedInto: SocketedInto
  gemSource: GemSource
}
