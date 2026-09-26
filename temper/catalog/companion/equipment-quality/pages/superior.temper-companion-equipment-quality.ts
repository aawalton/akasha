import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const superior = {
  id: "01a05fcd-ea6c-7ad2-ab83-40a6fbbc4cfa",
  type: "page-type/temper-companion-equipment-quality",
  slug: "superior",
  key: "superior",
  title: "Superior",
  available: true,
  displayOrder: 3,
  hashPlace: 3,
  lightArmorValue: 800,
  mediumArmorValue: 1800,
  heavyArmorValue: 2800,
  oneHandedWeaponDamage: 400,
  twoHandedWeaponDamage: 800,
  shieldArmorValue: 2800,
} as const satisfies TemperCompanionEquipmentQuality
