import type { OtherwhereIvHealth } from "akasha/story/world/pages/beware-of-chicken/stories/played/otherwhere-iv/mechanics/metrics/resources/health/otherwhere-iv-health.page-type.types.ts"

export const otherwhereIvNala = {
  id: "01a0e9f8-2aac-7d30-975a-113b3a26385c",
  type: "page-type/otherwhere-iv-health",
  slug: "otherwhere-iv-nala",
  character: "character-player/otherwhere-iv-nala",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
} as const satisfies OtherwhereIvHealth
