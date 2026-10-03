import type { CharacterOther } from "akasha/story/world/characters/character-other/character-other.page-type.types.ts"

export const theBeholderTamsin = {
  id: "01a0dec2-4dfc-7be7-bcef-227332e836ce",
  type: "page-type/character-other",
  slug: "the-beholder-tamsin",
  title: "Tamsin",
  world: "world/the-beholder",
  story: "story-written/the-beholder",
} as const satisfies CharacterOther
