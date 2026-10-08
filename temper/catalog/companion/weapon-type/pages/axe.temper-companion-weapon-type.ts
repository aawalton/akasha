import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const axe = {
  id: "01a05fcd-ea6c-7898-9204-eb806c0ad500",
  type: "page-type/temper-companion-weapon-type",
  slug: "axe",
  key: "axe",
  title: "Axe",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 2,
  hashPlace: 2,
  esoWeaponTypeNumber: 1,
  equipmentIconName: "axe",
  ttcItemId: 23609,
  createdAt: "2026-09-02T01:48:45.548Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
