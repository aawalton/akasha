import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const americaGroupLeader = {
  id: "01a0b707-6bd7-7224-829d-dcca5c404926",
  type: "page-type/world-character",
  slug: "america-group-leader",
  title: "America Group Leader",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
