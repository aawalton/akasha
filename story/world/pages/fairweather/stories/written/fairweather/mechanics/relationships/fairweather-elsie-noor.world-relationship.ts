import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieNoor = {
  id: "01a11214-e13c-74f3-9bbb-62750feb843c",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-noor",
  title: "Elsie and Noor",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-noor"],
  relationshipPoints: 20,
  createdAt: "2026-10-06T16:38:40.700Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies WorldRelationship
