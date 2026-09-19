import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const femaleGoblinLeader = {
  id: "01a0b70a-7e5e-72ad-bb6e-58b137ab19dd",
  type: "page-type/world-character",
  slug: "female-goblin-leader",
  title: "the female Goblin leader",
  world: "world/the-wandering-inn",
  firstChapter: 155,
  lastChapter: 155,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
