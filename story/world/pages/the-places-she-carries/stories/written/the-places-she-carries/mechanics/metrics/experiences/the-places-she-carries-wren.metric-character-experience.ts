import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const thePlacesSheCarriesWren = {
  id: "01a10337-ad0b-7ae1-b535-3c5ad09e8a2c",
  type: "page-type/metric-character-experience",
  slug: "the-places-she-carries-wren",
  title: "Experience",
  character: "character-player/the-places-she-carries-wren",
  value: 0,
  minValue: 0,
  unrevealed: false,
} as const satisfies MetricCharacterExperience
