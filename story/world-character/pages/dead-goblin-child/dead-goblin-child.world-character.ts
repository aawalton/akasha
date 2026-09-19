import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const deadGoblinChild = {
  id: "01a0b70a-13ef-73d5-a7b7-bc34b66a945e",
  type: "page-type/world-character",
  slug: "dead-goblin-child",
  title: "the hanged Goblin child",
  world: "world/the-wandering-inn",
  firstChapter: 214,
  lastChapter: 214,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
