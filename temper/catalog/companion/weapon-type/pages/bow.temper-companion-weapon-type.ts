import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const bow = {
  id: "01a05fcd-ea6d-731d-b902-cafe6af3d855",
  type: "page-type/temper-companion-weapon-type",
  slug: "bow",
  key: "bow",
  title: "Bow",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 8,
  hashPlace: 8,
  esoWeaponTypeNumber: 8,
  equipmentIconName: "bow",
  ttcItemId: 23789,
  createdAt: "2026-09-02T01:48:45.549Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
