import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const epic = {
  id: "01a05fcd-ea6a-7e89-90da-1cf498bbc1fa",
  type: "page-type/temper-companion-equipment-quality",
  slug: "epic",
  key: "epic",
  title: "Epic",
  available: true,
  displayOrder: 4,
  hashPlace: 4,
  lightArmorValue: 900,
  mediumArmorValue: 1900,
  heavyArmorValue: 2900,
  oneHandedWeaponDamage: 450,
  twoHandedWeaponDamage: 900,
  shieldArmorValue: 2900,
} as const satisfies TemperCompanionEquipmentQuality
