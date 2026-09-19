import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bograms = {
  id: "01a0b707-884c-79b8-83d6-d5ea90d6b955",
  type: "page-type/world-character",
  slug: "bograms",
  title: "Bograms",
  world: "world/the-wandering-inn",
  firstChapter: 677,
  lastChapter: 684,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
