import type { TemperCompanionBaseRole } from "../temper-companion-base-role.page-type.ts"

export const dps = {
  id: "01a05fce-c49a-791b-a58b-9a311f674333",
  pageTypeSlug: "temper-companion-base-role",
  slug: "dps",
  key: "dps",
  title: "DPS",
  description: "Focused on dealing damage",
  abbreviation: "D",
  displayOrder: 0,
  validArmorWeights: ["medium"],
  validTraitIds: ["aggressive", "shattering", "quickened", "focused"],
  validWeaponRoleIds: [
    "dual-wield",
    "two-handed",
    "bow",
    "inferno-staff",
    "ice-staff",
    "lightning-staff",
  ],
} as const satisfies TemperCompanionBaseRole
