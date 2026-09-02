import type { TemperCompanionBaseRole } from "../temper-companion-base-role.page-type.ts"

export const tank = {
  id: "01a05fce-c49c-7f82-966a-54778069c10a",
  pageTypeSlug: "temper-companion-base-role",
  slug: "tank",
  key: "tank",
  title: "Tank",
  description: "Focused on absorbing damage and controlling enemies",
  abbreviation: "T",
  displayOrder: 1,
  validArmorWeights: ["heavy"],
  validTraitIds: ["vigorous", "soothing", "quickened", "focused"],
  validWeaponRoleIds: ["one-hand-and-shield", "ice-staff", "restoration-staff"],
} as const satisfies TemperCompanionBaseRole
