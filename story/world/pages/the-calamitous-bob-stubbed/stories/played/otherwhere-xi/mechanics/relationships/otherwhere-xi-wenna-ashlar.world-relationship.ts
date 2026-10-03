import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const otherwhereXiWennaAshlar = {
  id: "01a0eab0-3774-732b-8436-1e3b0f2d193c",
  type: "page-type/world-relationship",
  slug: "otherwhere-xi-wenna-ashlar",
  title: "Nala and Wenna",
  world: "world/the-calamitous-bob-stubbed",
  characters: ["character-player/otherwhere-xi-nala", "character-other/otherwhere-xi-wenna-ashlar"],
  relationshipPoints: 10,
} as const satisfies WorldRelationship
