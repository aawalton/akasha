import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const lightningStaff = {
  id: "01a05fcd-ea6e-7b52-b906-d4451b8632b4",
  type: "page-type/temper-companion-weapon-type",
  slug: "lightning-staff",
  key: "lightning-staff",
  title: "Lightning Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 11,
  hashPlace: 11,
  esoWeaponTypeNumber: 15,
  equipmentIconName: "lightningstaff",
  ttcItemId: 23413,
  createdAt: "2026-09-02T01:48:45.550Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
