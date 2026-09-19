import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sorgenNilhor = {
  id: "01a0b70d-0a40-752c-9cd2-fd0b8daa2bd2",
  type: "page-type/world-character",
  slug: "sorgen-nilhor",
  title: "Sorgen Nilhor",
  world: "world/the-wandering-inn",
  firstChapter: 764,
  lastChapter: 764,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
