import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieTamsin = {
  id: "01a103ee-beb8-7b37-aa4d-607c503d4f40",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-tamsin",
  title: "Elsie and Tamsin",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-tamsin"],
  relationshipPoints: 15,
} as const satisfies WorldRelationship
