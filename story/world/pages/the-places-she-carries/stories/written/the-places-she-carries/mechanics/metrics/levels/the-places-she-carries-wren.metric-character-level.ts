import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const thePlacesSheCarriesWren = {
  id: "01a10337-ad0b-7a58-8124-70c20e85932e",
  type: "page-type/metric-character-level",
  slug: "the-places-she-carries-wren",
  character: "character-player/the-places-she-carries-wren",
  value: 6,
  minValue: 1,
  unrevealed: false,
} as const satisfies MetricCharacterLevel
