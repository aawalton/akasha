import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const fairweatherElsieInes = {
  id: "01a112d2-0bf7-7a15-bf2e-385307f9a1e8",
  type: "page-type/world-relationship",
  slug: "fairweather-elsie-ines",
  title: "Elsie and Ines",
  world: "world/fairweather",
  characters: ["character-player/fairweather-elsie", "character-other/fairweather-ines"],
  relationshipPoints: 12,
  createdAt: "2026-10-06T20:05:17.943Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies WorldRelationship
