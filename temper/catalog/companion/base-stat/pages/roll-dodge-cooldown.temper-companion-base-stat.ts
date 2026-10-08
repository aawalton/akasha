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
  createdAt: "2026-09-26T17:47:32.970Z",
  updatedAt: "2026-09-26T17:47:36.000Z",
} as const satisfies TemperCompanionBaseStat
