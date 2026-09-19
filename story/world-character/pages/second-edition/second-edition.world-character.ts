import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const secondEdition = {
  id: "01a0b70c-ef1b-7cd8-98a2-4fb3b913e313",
  type: "page-type/world-character",
  slug: "second-edition",
  title: "the Grand Design (Second Edition)",
  world: "world/the-wandering-inn",
  firstChapter: 750,
  lastChapter: 750,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
