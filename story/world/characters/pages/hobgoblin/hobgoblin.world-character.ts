import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hobgoblin = {
  id: "01a0b70a-feba-7545-8e63-739cf322ad95",
  type: "page-type/world-character",
  slug: "hobgoblin",
  title: "mysterious Goblin companion",
  world: "world/the-wandering-inn",
  firstChapter: 114,
  lastChapter: 114,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
