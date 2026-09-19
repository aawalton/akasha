import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblinKing = {
  id: "01a0b70a-a187-7ce1-9505-965054518ad8",
  type: "page-type/world-character",
  slug: "goblin-king",
  title: "Goblin King",
  world: "world/the-wandering-inn",
  firstChapter: 757,
  lastChapter: 759,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
