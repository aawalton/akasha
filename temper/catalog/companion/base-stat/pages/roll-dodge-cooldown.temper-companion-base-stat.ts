import type { TemperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.types.ts"

export const rollDodgeCooldown = {
  id: "01a0ded4-56ea-7399-884d-46ce34e76346",
  type: "page-type/temper-companion-base-stat",
  slug: "roll-dodge-cooldown",
  key: "roll-dodge-cooldown",
  title: "Base Roll Dodge Cooldown",
  metricId: "temper-companion-passive-metric/companion-roll-dodge-cooldown",
  effectType: "integer",
  value: 8,
} as const satisfies TemperCompanionBaseStat
