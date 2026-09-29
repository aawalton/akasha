import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereXBessCrane = {
  id: "01a0eb36-f992-7cd1-b787-6e0b69a5b294",
  type: "page-type/world-relationship",
  slug: "otherwhere-x-bess-crane",
  title: "Nala and Bess Crane",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "How far the reeve's wife regards Nala.",
  characters: ["character-player/otherwhere-x-nala", "world-character/otherwhere-x-bess-crane"],
  relationshipPoints: 4,
} as const satisfies WorldRelationship
