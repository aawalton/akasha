import type { TemperCompanionWeaponType } from "../temper-companion-weapon-type.page-type.ts"

export const restorationStaff = {
  id: "01a05fcd-ea6f-7341-85d1-97b7d8e83f05",
  pageTypeSlug: "temper-companion-weapon-type",
  slug: "restoration-staff",
  key: "restoration-staff",
  title: "Restoration Staff",
  isOffHandOnly: false,
  isTwoHanded: true,
  displayOrder: 12,
} as const satisfies TemperCompanionWeaponType
