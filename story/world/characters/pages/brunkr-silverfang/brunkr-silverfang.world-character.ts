import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const brunkrSilverfang = {
  id: "01a0b707-8a99-727a-ad00-3421b6caaf57",
  type: "page-type/world-character",
  slug: "brunkr-silverfang",
  title: "Brunkr Silverfang",
  world: "world/the-wandering-inn",
  firstChapter: 508,
  lastChapter: 508,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
