import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereXMarthaDeane = {
  id: "01a0eafa-9a3a-7b75-b6cb-8a8565c3c601",
  type: "page-type/world-relationship",
  slug: "otherwhere-x-martha-deane",
  title: "Nala and Martha Deane",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "How far the Sheaf's keeper regards Nala.",
  characters: ["character-player/otherwhere-x-nala", "character-other/otherwhere-x-martha-deane"],
  relationshipPoints: 3,
} as const satisfies WorldRelationship
