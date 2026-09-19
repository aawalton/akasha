import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const toriska = {
  id: "01a0b70d-6e5e-77f9-bca1-690b6b7c7062",
  type: "page-type/world-character",
  slug: "toriska",
  title: "Toriska",
  world: "world/the-wandering-inn",
  firstChapter: 30,
  lastChapter: 58,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
