import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiTobinWick = {
  id: "01a0f177-8423-7a64-8ef1-819217863047",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-tobin-wick",
  title: "Nala and Tobin Wick",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-tobin-wick"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
