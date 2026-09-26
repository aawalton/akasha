import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualityAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import {
  type CompanionWeaponTypeId,
  companionWeaponTypes,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"

type WeaponCategory = "one-handed" | "two-handed" | "shield" | "none"

function categoryOf(weaponTypeId: CompanionWeaponTypeId): WeaponCategory {
  if (weaponTypeId === "no-type") return "none"
  const type = companionWeaponTypes().find((one) => one.id === weaponTypeId)
  if (type === undefined) return "none"
  if (type.isOffHandOnly) return "shield"
  return type.isTwoHanded ? "two-handed" : "one-handed"
}

export function getCompanionWeaponBaseDamage(
  weaponTypeId: CompanionWeaponTypeId,
  quality: CompanionEquipmentQualityId = "legendary"
): number {
  if (quality === "no-quality") return 0
  const category = categoryOf(weaponTypeId)
  const values = companionEquipmentQualityAt(quality).baseValues
  if (category === "one-handed") return values.oneHandedDamage
  if (category === "two-handed") return values.twoHandedDamage
  return 0
}

export function isCompanionWeaponShield(weaponTypeId: CompanionWeaponTypeId): boolean {
  return categoryOf(weaponTypeId) === "shield"
}

export function getCompanionShieldArmorValue(
  quality: CompanionEquipmentQualityId = "legendary"
): number {
  if (quality === "no-quality") return 0
  return companionEquipmentQualityAt(quality).baseValues.shieldArmor
}
