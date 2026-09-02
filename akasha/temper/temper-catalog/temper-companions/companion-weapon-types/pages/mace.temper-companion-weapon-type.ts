import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const mace = {
  id: "01a05fcd-ea6f-7af9-aef3-cfa538c9966d",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "mace",
  key: "mace",
  title: "Mace",
  isOffHandOnly: false,
  isTwoHanded: false,
  displayOrder: 3,
} as const satisfies TemperCompanionWeaponType
