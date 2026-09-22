import type { EnchantmentMultiplier } from "akasha/temper/catalog/gear/temper-weapon-type/properties/enchantment-multiplier.number-property.types.ts"
import type { EsoWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/properties/eso-weapon-type.text-property.types.ts"
import type { WeaponTypePower } from "akasha/temper/catalog/gear/temper-weapon-type/properties/weapon-type-power.number-property.types.ts"
import type { ValidSlots } from "akasha/temper/catalog/gear/thing/properties/valid-slots.one-of-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/gear/thing/temper-gear-thing.page-type.types.ts"
import type { IsTwoHanded } from "akasha/temper/catalog/thing/properties/is-two-handed.boolean-property.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/thing/properties/skill-line-id.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperWeaponType = TemperGearThing & {
  key: Key
  enchantmentMultiplier: EnchantmentMultiplier
  esoWeaponType: EsoWeaponType
  isTwoHanded: IsTwoHanded
  weaponPower: WeaponTypePower
  validSlots: ValidSlots
  skillLineId?: SkillLineId
}
