import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const infernoStaff = {
  id: "01a05fcd-ea6e-7c63-8806-4b69ae3df492",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "inferno-staff",
  key: "inferno-staff",
  title: "Inferno Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 9,
} as const satisfies TemperCompanionWeaponType
