import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieTilly = {
  id: "01a1047a-4367-7e1b-8f08-8ed90f45fbd7",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-tilly",
  title: "Elsie and Tilly",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-tilly"],
  relationshipPoints: 10,
} as const satisfies WorldRelationship
