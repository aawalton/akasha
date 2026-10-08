import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hobgoblin = {
  id: "01a0b70a-feba-7545-8e63-739cf322ad95",
  type: "page-type/world-character",
  slug: "hobgoblin",
  title: "mysterious Goblin companion",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 114,
  lastChapter: 114,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:26.234Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
