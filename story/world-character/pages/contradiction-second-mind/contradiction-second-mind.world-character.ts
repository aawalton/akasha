import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const contradictionSecondMind = {
  id: "01a0b70a-0757-73ef-b801-0767b39fd649",
  type: "page-type/world-character",
  slug: "contradiction-second-mind",
  title: "Contradiction",
  world: "world/the-wandering-inn",
  firstChapter: 618,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
