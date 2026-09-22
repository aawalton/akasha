import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { ValidMainHandWeaponTypes } from "akasha/temper/catalog/companion/weapon-role/properties/valid-main-hand-weapon-types.text-property.types.ts"
import type { ValidOffHandWeaponTypes } from "akasha/temper/catalog/companion/weapon-role/properties/valid-off-hand-weapon-types.text-property.types.ts"
import type { WeaponSkillLine } from "akasha/temper/catalog/companion/weapon-role/properties/weapon-skill-line.relation-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionWeaponRole = TemperCompanionThing & {
  key: Key
  validMainHandWeaponTypes?: ValidMainHandWeaponTypes
  validOffHandWeaponTypes?: ValidOffHandWeaponTypes
  weaponSkillLineId: WeaponSkillLine
}
