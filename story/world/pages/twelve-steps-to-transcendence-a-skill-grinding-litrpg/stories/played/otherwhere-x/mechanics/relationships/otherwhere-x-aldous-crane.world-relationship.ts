import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereXAldousCrane = {
  id: "01a0eab7-192c-7ae7-a193-0a19749e73c1",
  type: "page-type/world-relationship",
  slug: "otherwhere-x-aldous-crane",
  title: "Nala and Aldous Crane",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "How far Harrow's reeve regards Nala.",
  characters: ["character-player/otherwhere-x-nala", "character-other/otherwhere-x-aldous-crane"],
  relationshipPoints: 8,
} as const satisfies WorldRelationship
