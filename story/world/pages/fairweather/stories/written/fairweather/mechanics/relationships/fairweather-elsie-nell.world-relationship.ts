import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieNell = {
  id: "01a10758-b424-774e-b7f8-13c04c04bbee",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-nell",
  title: "Elsie and Nell",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-nell"],
  relationshipPoints: 3,
} as const satisfies WorldRelationship
