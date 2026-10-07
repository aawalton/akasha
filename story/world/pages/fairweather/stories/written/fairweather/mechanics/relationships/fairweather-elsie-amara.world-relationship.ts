import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieAmara = {
  id: "01a111e7-644c-7352-8970-0da7786a67d4",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-amara",
  title: "Elsie and Amara",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-amara"],
  relationshipPoints: 10,
} as const satisfies WorldRelationship
