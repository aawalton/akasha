import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff8-9a7f-7baa-a434-459b03694f64",
  type: "page-type/metric-character-level",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  value: 3,
  minValue: 1,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterLevel
