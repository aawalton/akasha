import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieTilly = {
  id: "01a10321-4a85-748a-b3d0-6471dc34d87c",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-tilly",
  title: "Elsie and Tilly",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-tilly"],
  relationshipPoints: 10,
} as const satisfies WorldRelationship
