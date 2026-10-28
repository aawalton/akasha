import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff2-6f78-7584-ad5c-67ab44971225",
  type: "page-type/metric-character-experience",
  slug: "skill-lock-probe-player",
  title: "Experience Points",
  character: "character-player/skill-lock-probe-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies MetricCharacterExperience
