import type { TemperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.types.ts"

export const fine = {
  id: "01a05fcd-ea6b-7297-aff9-bc6b6c148d72",
  type: "page-type/temper-companion-equipment-quality",
  slug: "fine",
  key: "fine",
  title: "Fine",
  available: true,
  displayOrder: 2,
  hashPlace: 2,
  lightArmorValue: 700,
  mediumArmorValue: 1700,
  heavyArmorValue: 2700,
  oneHandedWeaponDamage: 350,
  twoHandedWeaponDamage: 700,
  shieldArmorValue: 2700,
  ttcQualityId: 1,
  createdAt: "2026-09-02T01:48:45.547Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionEquipmentQuality
