import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinKing = {
  id: "01a0b70a-a187-7ce1-9505-965054518ad8",
  type: "page-type/world-character",
  slug: "goblin-king",
  title: "Goblin King",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 757,
  lastChapter: 759,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:02.375Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
