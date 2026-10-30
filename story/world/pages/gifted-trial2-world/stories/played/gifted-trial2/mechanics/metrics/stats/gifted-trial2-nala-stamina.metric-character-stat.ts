import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const giftedTrial2NalaStamina = {
  id: "01a18dab-06cd-7762-8034-2d82984aaeec",
  type: "page-type/metric-character-stat",
  slug: "gifted-trial2-nala-stamina",
  statGroup: "world-stat-group/gifted-trial2-world-basic-attributes",
  character: "character-player/gifted-trial2-nala",
  value: 100,
  minValue: 0,
  unrevealed: false,
  displayOrder: 2,
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies MetricCharacterStat
