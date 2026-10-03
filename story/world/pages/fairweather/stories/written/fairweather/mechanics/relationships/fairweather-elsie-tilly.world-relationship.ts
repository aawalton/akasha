import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieTilly = {
  id: "01a103ee-beb9-7d2c-b21c-b806e979bbb8",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-tilly",
  title: "Elsie and Tilly",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-tilly"],
  relationshipPoints: 10,
} as const satisfies WorldRelationship
