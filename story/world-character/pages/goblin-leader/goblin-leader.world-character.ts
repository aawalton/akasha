import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const goblinLeader = {
  id: "01a0b70a-a1be-7ce9-b7ae-d87ee817c216",
  type: "page-type/world-character",
  slug: "goblin-leader",
  title: "the large Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 32,
  lastChapter: 32,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
