import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const mace = {
  id: "01a05fcd-ea6f-7af9-aef3-cfa538c9966d",
  type: "page-type/temper-companion-weapon-type",
  slug: "mace",
  key: "mace",
  title: "Mace",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 3,
  hashPlace: 3,
  esoWeaponTypeNumber: 2,
  equipmentIconName: "mace",
  ttcItemId: 23712,
  createdAt: "2026-09-02T01:48:45.551Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
