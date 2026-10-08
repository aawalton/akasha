import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const dagger = {
  id: "01a05fcd-ea6d-75c8-a65a-8f83fbbdd731",
  type: "page-type/temper-companion-weapon-type",
  slug: "dagger",
  key: "dagger",
  title: "Dagger",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 4,
  hashPlace: 4,
  esoWeaponTypeNumber: 11,
  equipmentIconName: "dagger",
  ttcItemId: 23430,
  createdAt: "2026-09-02T01:48:45.549Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
