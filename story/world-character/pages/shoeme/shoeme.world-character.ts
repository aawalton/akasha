import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shoeme = {
  id: "01a0b70c-fd44-7578-a66d-25ebe5bd3095",
  type: "page-type/world-character",
  slug: "shoeme",
  title: "Shoeme",
  world: "world/the-wandering-inn",
  firstChapter: 634,
  lastChapter: 634,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
