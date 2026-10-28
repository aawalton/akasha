import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const skillLockProbePlayerWits = {
  id: "01a17ff2-6f78-7aa9-84d4-fca5557d9908",
  type: "page-type/metric-character-stat",
  slug: "skill-lock-probe-player-wits",
  character: "character-player/skill-lock-probe-player",
  value: 10,
  minValue: 0,
  displayOrder: 3,
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies MetricCharacterStat
