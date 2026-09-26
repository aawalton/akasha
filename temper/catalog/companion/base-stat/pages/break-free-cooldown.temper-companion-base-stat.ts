import type { TemperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.types.ts"

export const breakFreeCooldown = {
  id: "01a0ded4-56e9-74d7-b3d0-38d2a6096cfc",
  type: "page-type/temper-companion-base-stat",
  slug: "break-free-cooldown",
  key: "break-free-cooldown",
  title: "Base Break Free Cooldown",
  metricId: "temper-companion-passive-metric/companion-break-free-cooldown",
  effectType: "integer",
  value: 12,
} as const satisfies TemperCompanionBaseStat
