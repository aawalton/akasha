import type { ArmorMultiplier } from "akasha/temper/catalog/gear/temper-armor-type/properties/armor-multiplier.number-property.types.ts"
import type { EnchantmentMultiplier } from "akasha/temper/catalog/gear/temper-weapon-type/properties/enchantment-multiplier.number-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/gear/thing/properties/valid-slots.one-of-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperArmorType = TemperGearThing & {
  key: Key
  armorMultiplier: ArmorMultiplier
  enchantmentMultiplier: EnchantmentMultiplier
  validSlots: ValidSlots
}
