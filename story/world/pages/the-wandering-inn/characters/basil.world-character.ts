import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const basil = {
  id: "01a0b707-7b90-721b-a3c0-37097484efff",
  type: "page-type/world-character",
  slug: "basil",
  title: "Basil",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
