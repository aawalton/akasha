import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const legendary = {
  id: "01a05fcd-ea6b-7f78-909e-9730f0168629",
  type: "page-type/temper-companion-equipment-quality",
  slug: "legendary",
  key: "legendary",
  title: "Legendary",
  available: false,
  displayOrder: 5,
  hashPlace: 5,
  lightArmorValue: 1000,
  mediumArmorValue: 2000,
  heavyArmorValue: 3000,
  oneHandedWeaponDamage: 500,
  twoHandedWeaponDamage: 1000,
  shieldArmorValue: 3000,
} as const satisfies TemperCompanionEquipmentQuality
