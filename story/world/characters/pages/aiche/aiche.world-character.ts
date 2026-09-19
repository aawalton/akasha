import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const aiche = {
  id: "01a0b707-65eb-7dd3-968d-de4ab7703237",
  type: "page-type/world-character",
  slug: "aiche",
  title: "Aiche",
  world: "world/the-wandering-inn",
  firstChapter: 795,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
