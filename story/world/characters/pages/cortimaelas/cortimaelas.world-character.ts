import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cortimaelas = {
  id: "01a0b70a-08c9-75a2-9289-367482788788",
  type: "page-type/world-character",
  slug: "cortimaelas",
  title: "Cortimaelas",
  world: "world/the-wandering-inn",
  firstChapter: 600,
  lastChapter: 600,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
