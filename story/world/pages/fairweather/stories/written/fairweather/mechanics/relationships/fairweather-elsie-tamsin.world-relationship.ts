import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieTamsin = {
  id: "01a10321-4a85-7a65-973b-6efff5607ff2",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-tamsin",
  title: "Elsie and Tamsin",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-tamsin"],
  relationshipPoints: 15,
} as const satisfies WorldRelationship
