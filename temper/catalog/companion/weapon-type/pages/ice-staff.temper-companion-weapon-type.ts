import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"

export const iceStaff = {
  id: "01a05fcd-ea6e-7f89-aded-b151567d06b7",
  type: "page-type/temper-companion-weapon-type",
  slug: "ice-staff",
  key: "ice-staff",
  title: "Ice Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 10,
  hashPlace: 10,
  esoWeaponTypeNumber: 13,
  equipmentIconName: "froststaff",
  ttcItemId: 23585,
  createdAt: "2026-09-02T01:48:45.550Z",
  updatedAt: "2026-09-27T03:35:13.000Z",
} as const satisfies TemperCompanionWeaponType
