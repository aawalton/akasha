import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { ArmorType } from "akasha/temper/player/character/temper-mine/properties/armor-type.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionArmorWeight = TemperCompanionThing & {
  key: Key
  hashPlace: HashPlace
  armorType?: ArmorType
}
