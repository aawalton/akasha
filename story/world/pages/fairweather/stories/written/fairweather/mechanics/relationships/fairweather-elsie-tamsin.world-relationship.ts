import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieTamsin = {
  id: "01a1047a-4366-7b3f-b36f-cb26ad9668f9",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-tamsin",
  title: "Elsie and Tamsin",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-tamsin"],
  relationshipPoints: 104,
  createdAt: "2026-10-04T01:14:43.942Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies WorldRelationship
