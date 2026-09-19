import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const terbore = {
  id: "01a0b70d-159b-7ab1-afa0-b41dc339349b",
  type: "page-type/world-character",
  slug: "terbore",
  title: "Terbore",
  world: "world/the-wandering-inn",
  firstChapter: 23,
  lastChapter: 23,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
