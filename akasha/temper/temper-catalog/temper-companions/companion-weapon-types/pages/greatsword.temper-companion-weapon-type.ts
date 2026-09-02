import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const greatsword = {
  id: "01a05fcd-ea6e-7bb6-9628-5a72f8697fa5",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "greatsword",
  key: "greatsword",
  title: "Greatsword",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 5,
} as const satisfies TemperCompanionWeaponType
