import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinLeader = {
  id: "01a0b70a-a1be-7ce9-b7ae-d87ee817c216",
  type: "page-type/world-character",
  slug: "goblin-leader",
  title: "the large Goblin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 32,
  lastChapter: 32,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:02.430Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
