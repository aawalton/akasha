import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pihava = {
  id: "01a0b70c-6d04-7eb0-9485-30a2db7cfbeb",
  type: "page-type/world-character",
  slug: "pihava",
  title: "Pihava",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
