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
  ttcQualityId: 4,
  createdAt: "2026-09-02T01:48:45.547Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionEquipmentQuality
