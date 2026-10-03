import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereXiTobinAshlar = {
  id: "01a0ea91-9acb-7431-b67f-33f89661640c",
  type: "page-type/world-relationship",
  slug: "otherwhere-xi-tobin-ashlar",
  title: "Nala and Tobin",
  world: "world/the-calamitous-bob-stubbed",
  characters: ["character-player/otherwhere-xi-nala", "character-other/otherwhere-xi-tobin-ashlar"],
  relationshipPoints: 1,
} as const satisfies WorldRelationship
