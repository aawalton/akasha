import type { CharacterOther } from "akasha/story/world/characters/character-other/character-other.page-type.types.ts"

export const towerOfNimueMarcus = {
  id: "01a0dec2-4dfc-7acb-b2ff-2808925c418b",
  type: "page-type/character-other",
  slug: "tower-of-nimue-marcus",
  title: "Marcus",
  world: "world/tower-of-nimue",
  story: "story-written/tower-of-nimue",
  place: "place/tower-of-nimue-st-brigids",
} as const satisfies CharacterOther
