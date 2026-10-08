import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieCora = {
  id: "01a10495-c2ef-7dc0-b127-cbb4b754ad9c",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-cora",
  title: "Elsie and Cora",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-cora"],
  relationshipPoints: 68,
  createdAt: "2026-10-04T01:44:46.063Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies WorldRelationship
