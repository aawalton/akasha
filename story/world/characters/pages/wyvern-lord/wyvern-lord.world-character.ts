import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wyvernLord = {
  id: "01a0b70d-a1f6-7d3a-a6ef-5ace3bb59339",
  type: "page-type/world-character",
  slug: "wyvern-lord",
  title: "the Wyvern Lord",
  world: "world/the-wandering-inn",
  firstChapter: 409,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
