import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lorent = {
  id: "01a0b70b-8c88-75ac-9d0a-b1f01743314d",
  type: "page-type/world-character",
  slug: "lorent",
  title: "the armed shopkeeper",
  world: "world/the-wandering-inn",
  firstChapter: 320,
  lastChapter: 320,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
