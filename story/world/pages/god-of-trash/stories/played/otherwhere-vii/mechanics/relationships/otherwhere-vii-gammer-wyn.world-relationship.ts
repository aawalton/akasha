import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereViiGammerWyn = {
  id: "01a0ea78-f670-758e-a243-849ab3363855",
  type: "page-type/world-relationship",
  slug: "otherwhere-vii-gammer-wyn",
  title: "Nala and Gammer Wyn",
  world: "world/god-of-trash",
  characters: ["character-player/otherwhere-vii-nala", "character-other/otherwhere-vii-gammer-wyn"],
  relationshipPoints: 3,
} as const satisfies WorldRelationship
