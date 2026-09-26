import type { HeavyArmorValue } from "akasha/temper/catalog/companion/equipment-quality/properties/heavy-armor-value.number-property.types.ts"
import type { LightArmorValue } from "akasha/temper/catalog/companion/equipment-quality/properties/light-armor-value.number-property.types.ts"
import type { MediumArmorValue } from "akasha/temper/catalog/companion/equipment-quality/properties/medium-armor-value.number-property.types.ts"
import type { OneHandedWeaponDamage } from "akasha/temper/catalog/companion/equipment-quality/properties/one-handed-weapon-damage.number-property.types.ts"
import type { ShieldArmorValue } from "akasha/temper/catalog/companion/equipment-quality/properties/shield-armor-value.number-property.types.ts"
import type { TwoHandedWeaponDamage } from "akasha/temper/catalog/companion/equipment-quality/properties/two-handed-weapon-damage.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { Available } from "akasha/temper/catalog/thing/properties/available.boolean-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionEquipmentQuality = TemperCompanionThing & {
  lightArmorValue: LightArmorValue
  mediumArmorValue: MediumArmorValue
  heavyArmorValue: HeavyArmorValue
  oneHandedWeaponDamage: OneHandedWeaponDamage
  twoHandedWeaponDamage: TwoHandedWeaponDamage
  shieldArmorValue: ShieldArmorValue
  key: Key
  available: Available
  displayOrder: DisplayOrder
  hashPlace: HashPlace
}
