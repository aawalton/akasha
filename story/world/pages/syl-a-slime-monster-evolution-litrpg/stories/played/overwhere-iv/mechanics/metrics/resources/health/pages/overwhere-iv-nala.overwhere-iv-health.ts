import type { OverwhereIvHealth } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/metrics/resources/health/overwhere-iv-health.page-type.types.ts"

export const overwhereIvNala = {
  id: "01a0ed22-eab7-7c50-8bc3-05e5e81b9872",
  type: "page-type/overwhere-iv-health",
  slug: "overwhere-iv-nala",
  character: "character-player/overwhere-iv-nala",
  value: 30,
  minValue: 0,
  maxValue: 30,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
} as const satisfies OverwhereIvHealth
