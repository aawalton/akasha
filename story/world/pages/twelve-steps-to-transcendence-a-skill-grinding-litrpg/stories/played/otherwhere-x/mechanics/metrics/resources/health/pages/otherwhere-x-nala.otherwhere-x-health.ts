import type { OtherwhereXHealth } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/metrics/resources/health/otherwhere-x-health.page-type.types.ts"

export const otherwhereXNala = {
  id: "01a0ea6b-6040-75ea-b22f-dd3775562b49",
  type: "page-type/otherwhere-x-health",
  slug: "otherwhere-x-nala",
  character: "character-player/otherwhere-x-nala",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  unrevealed: true,
} as const satisfies OtherwhereXHealth
