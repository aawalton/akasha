import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { EsoEnchantConstantName } from "akasha/temper/catalog/gear/thing/properties/eso-enchant-constant-name.text-property.types.ts"
import type { EsoEnchantSearchCategory } from "akasha/temper/catalog/gear/thing/properties/eso-enchant-search-category.number-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperWeaponEnchant = TemperGearThing & {
  key: Key
  displayOrder: DisplayOrder
  esoEnchantConstantName: EsoEnchantConstantName
  hashPlace: HashPlace
  esoEnchantSearchCategory: EsoEnchantSearchCategory
}
