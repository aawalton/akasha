import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const silverRankedAdventurer = {
  id: "01a0b70d-012c-7c3e-9ece-0b1a23aa3066",
  type: "page-type/world-character",
  slug: "silver-ranked-adventurer",
  title: "the Silver-ranked adventurer",
  world: "world/the-wandering-inn",
  firstChapter: 214,
  lastChapter: 214,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
