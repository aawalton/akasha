import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieNoor = {
  id: "01a11214-e13c-74f3-9bbb-62750feb843c",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-noor",
  title: "Elsie and Noor",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-noor"],
  relationshipPoints: 20,
} as const satisfies WorldRelationship
