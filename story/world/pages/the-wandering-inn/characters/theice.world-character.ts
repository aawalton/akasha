import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theice = {
  id: "01a0b70d-223b-77e5-8891-981b643feb7b",
  type: "page-type/world-character",
  slug: "theice",
  title: "Theice",
  world: "world/the-wandering-inn",
  firstChapter: 631,
  lastChapter: 631,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
