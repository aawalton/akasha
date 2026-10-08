import type { TemperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.types.ts"

export const support = {
  id: "01a05fce-c49b-727b-849d-73e52fac2adc",
  type: "page-type/temper-companion-base-role",
  slug: "support",
  key: "support",
  title: "Support",
  description: "Focused on buffing allies through offensive and defensive buffs and debuffs",
  abbreviation: "S",
  displayOrder: 3,
  totalMetric: "temper-metric/companion-support-score",
  validArmorWeights: ["light"],
  validTraitIds: ["quickened"],
  validWeaponRoleIds: ["restoration-staff"],
  createdAt: "2026-09-02T01:49:41.403Z",
  updatedAt: "2026-09-26T19:12:14.000Z",
} as const satisfies TemperCompanionBaseRole
