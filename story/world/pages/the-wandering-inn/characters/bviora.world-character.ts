import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bviora = {
  id: "01a0b707-8bd4-78db-a88a-7c6833ae1299",
  type: "page-type/world-character",
  slug: "bviora",
  title: "Bviora Stormless",
  world: "world/the-wandering-inn",
  firstChapter: 647,
  lastChapter: 678,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
