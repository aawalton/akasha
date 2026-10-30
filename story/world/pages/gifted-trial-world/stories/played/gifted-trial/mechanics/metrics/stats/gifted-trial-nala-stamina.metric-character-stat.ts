import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedTrialNalaStamina = {
  id: "01a18d10-93f1-7588-a93b-aef2cd09428d",
  type: "page-type/metric-character-stat",
  slug: "gifted-trial-nala-stamina",
  statGroup: "world-stat-group/gifted-trial-world-basic-attributes",
  character: "character-player/gifted-trial-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 2,
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies MetricCharacterStat
