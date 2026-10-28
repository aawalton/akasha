import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const skillLockProbePlayerWits = {
  id: "01a17ff8-9a7f-7064-b93b-0c2a6afd3011",
  type: "page-type/metric-character-stat",
  slug: "skill-lock-probe-player-wits",
  character: "character-player/skill-lock-probe-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterStat
