import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff8-9a7f-757f-8736-ee291b560e86",
  type: "page-type/metric-character-experience",
  slug: "skill-lock-probe-player",
  title: "Experience Points",
  character: "character-player/skill-lock-probe-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterExperience
