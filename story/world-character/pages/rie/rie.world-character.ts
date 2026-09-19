import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rie = {
  id: "01a0b70c-9813-7e86-8e8d-55c5faec5670",
  type: "page-type/world-character",
  slug: "rie",
  title: "Rie",
  world: "world/the-wandering-inn",
  firstChapter: 346,
  lastChapter: 351,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
