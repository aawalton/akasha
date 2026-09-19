import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bethalWalchais = {
  id: "01a0b707-8300-7a1a-ad3c-227e0cfa1904",
  type: "page-type/world-character",
  slug: "bethal-walchais",
  title: "Bethal Walchais",
  world: "world/the-wandering-inn",
  firstChapter: 237,
  lastChapter: 432,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
