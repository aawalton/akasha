import type { CharacterOther } from "akasha/story/world/characters/character-other/character-other.page-type.types.ts"

export const superSupportiveBird = {
  id: "01a0ea1b-ad76-7c7b-bf38-5f351d32a8bd",
  type: "page-type/character-other",
  slug: "super-supportive-bird",
  title: "Bird",
  world: "world/super-supportive",
  story: "story-read/super-supportive",
} as const satisfies CharacterOther
