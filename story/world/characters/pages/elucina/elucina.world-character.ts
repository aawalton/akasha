import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const elucina = {
  id: "01a0b70a-6797-72a8-b12c-0027357a4721",
  type: "page-type/world-character",
  slug: "elucina",
  title: "Elucina",
  world: "world/the-wandering-inn",
  firstChapter: 509,
  lastChapter: 509,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
