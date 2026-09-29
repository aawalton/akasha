import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiAldoReeve = {
  id: "01a0ea5f-3c93-7748-96fc-9150f5725eb6",
  type: "page-type/world-relationship",
  slug: "otherwhere-vii-aldo-reeve",
  title: "Nala and Aldo Reeve",
  world: "world/god-of-trash",
  characters: ["character-player/otherwhere-vii-nala", "character-other/otherwhere-vii-aldo-reeve"],
  relationshipPoints: 5,
} as const satisfies WorldRelationship
