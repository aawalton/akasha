import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieCora = {
  id: "01a10495-c2ef-7dc0-b127-cbb4b754ad9c",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-cora",
  title: "Elsie and Cora",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-cora"],
  relationshipPoints: 5,
} as const satisfies WorldRelationship
