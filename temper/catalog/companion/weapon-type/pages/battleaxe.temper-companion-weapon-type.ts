import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const battleaxe = {
  id: "01a05fcd-ea6c-7761-a6b6-2c3c70368794",
  type: "page-type/temper-companion-weapon-type",
  slug: "battleaxe",
  key: "battleaxe",
  title: "Battleaxe",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 6,
  hashPlace: 6,
  esoWeaponTypeNumber: 5,
  equipmentIconName: "battleaxe",
  ttcItemId: 23792,
  createdAt: "2026-09-02T01:48:45.548Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
