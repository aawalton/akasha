import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const shield = {
  id: "01a05fcd-ea70-706d-82b2-f64fc815bb91",
  type: "page-type/temper-companion-weapon-type",
  slug: "shield",
  key: "shield",
  title: "Shield",
  isOffHandOnly: true,
  isTwoHanded: false,
  displayOrder: 13,
  hashPlace: 13,
  esoWeaponTypeNumber: 14,
  equipmentIconName: "shield",
  ttcItemId: 23435,
  createdAt: "2026-09-02T01:48:45.552Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
