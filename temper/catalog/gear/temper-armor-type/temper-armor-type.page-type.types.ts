import type { ArmorMultiplier } from "akasha/temper/catalog/gear/temper-armor-type/properties/armor-multiplier.number-property.types.ts"
import type { IsLargeEnchantSlot } from "akasha/temper/catalog/gear/temper-armor-type/properties/is-large-enchant-slot.boolean-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/gear/thing/properties/valid-slots.one-of-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperArmorType = TemperGearThing & {
  key: Key
  armorMultiplier: ArmorMultiplier
  isLargeEnchantSlot: IsLargeEnchantSlot
  validSlots: ValidSlots
}
