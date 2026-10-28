import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const skillLockProbePlayerStrength = {
  id: "01a17ff8-9a7f-7174-883e-747fa7e33956",
  type: "page-type/metric-character-stat",
  slug: "skill-lock-probe-player-strength",
  character: "character-player/skill-lock-probe-player",
  value: 12,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterStat
