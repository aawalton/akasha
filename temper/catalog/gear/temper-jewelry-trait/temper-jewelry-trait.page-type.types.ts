import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { Available } from "akasha/temper/catalog/thing/properties/available.boolean-property.types.ts"
import type { EsoTraitConstantName } from "akasha/temper/catalog/thing/properties/eso-trait-constant-name.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperJewelryTrait = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoTraitConstantName: EsoTraitConstantName
  hashPlace: HashPlace
  available: Available
}
