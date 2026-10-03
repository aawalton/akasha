import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const theIdleEpochCallum = {
  id: "01a10332-4088-763e-8177-831f5f1d82cb",
  type: "page-type/metric-character-level",
  slug: "the-idle-epoch-callum",
  character: "character-player/the-idle-epoch-callum",
  value: 8,
  minValue: 1,
  unrevealed: false,
} as const satisfies MetricCharacterLevel
