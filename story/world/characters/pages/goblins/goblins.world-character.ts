import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const goblins = {
  id: "01a0b70a-e490-74cb-b776-4c7a1b00813f",
  type: "page-type/world-character",
  slug: "goblins",
  title: "Goblins",
  world: "world/the-wandering-inn",
  firstChapter: 28,
  lastChapter: 28,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
