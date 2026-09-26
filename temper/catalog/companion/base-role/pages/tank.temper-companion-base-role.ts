import type { TemperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.types.ts"

export const tank = {
  id: "01a05fce-c49c-7f82-966a-54778069c10a",
  type: "page-type/temper-companion-base-role",
  slug: "tank",
  key: "tank",
  title: "Tank",
  description: "Focused on absorbing damage and controlling enemies",
  abbreviation: "T",
  displayOrder: 1,
  totalMetric: "temper-metric/companion-tps-total",
  validArmorWeights: ["heavy"],
  defaultTraitId: "vigorous",
  defaultMainHand: "sword",
  defaultOffHand: "shield",
  validTraitIds: ["vigorous", "soothing", "quickened", "focused"],
  validWeaponRoleIds: ["one-hand-and-shield", "ice-staff", "restoration-staff"],
} as const satisfies TemperCompanionBaseRole
