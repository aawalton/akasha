import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereXHobCrane = {
  id: "01a0eb35-1472-7855-94c8-e6545d026c43",
  type: "page-type/world-relationship",
  slug: "otherwhere-x-hob-crane",
  title: "Nala and Hob Crane",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "How far the reeve's goose boy regards Nala.",
  characters: ["character-player/otherwhere-x-nala", "world-character/otherwhere-x-hob-crane"],
  relationshipPoints: 10,
} as const satisfies WorldRelationship
