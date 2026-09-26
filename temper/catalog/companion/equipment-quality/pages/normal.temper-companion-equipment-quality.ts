import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const normal = {
  id: "01a05fcd-ea6c-7631-9744-b79d007bfe5c",
  type: "page-type/temper-companion-equipment-quality",
  slug: "normal",
  key: "normal",
  title: "Normal",
  available: true,
  displayOrder: 1,
  hashPlace: 1,
  lightArmorValue: 600,
  mediumArmorValue: 1600,
  heavyArmorValue: 2600,
  oneHandedWeaponDamage: 300,
  twoHandedWeaponDamage: 600,
  shieldArmorValue: 2600,
} as const satisfies TemperCompanionEquipmentQuality
