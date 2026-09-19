import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sheta = {
  id: "01a0b70c-fc9d-7116-ad48-2f4951d46c2b",
  type: "page-type/world-character",
  slug: "sheta",
  title: "Empress Sheta",
  world: "world/the-wandering-inn",
  firstChapter: 598,
  lastChapter: 760,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
