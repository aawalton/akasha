import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const skillLockProbePlayerStrength = {
  id: "01a17ff2-6f78-7101-8920-7a6af4c2928e",
  type: "page-type/metric-character-stat",
  slug: "skill-lock-probe-player-strength",
  character: "character-player/skill-lock-probe-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies MetricCharacterStat
