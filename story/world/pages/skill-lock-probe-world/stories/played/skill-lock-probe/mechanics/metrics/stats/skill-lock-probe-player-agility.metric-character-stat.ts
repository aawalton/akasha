import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const skillLockProbePlayerAgility = {
  id: "01a17ff8-9a7f-720d-94e4-12e429e49e05",
  type: "page-type/metric-character-stat",
  slug: "skill-lock-probe-player-agility",
  character: "character-player/skill-lock-probe-player",
  value: 14,
  minValue: 0,
  displayOrder: 2,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterStat
