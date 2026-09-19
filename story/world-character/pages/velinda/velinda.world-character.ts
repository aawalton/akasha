import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const velinda = {
  id: "01a0b70d-8b0f-71d4-bd8c-88d9e5b2e619",
  type: "page-type/world-character",
  slug: "velinda",
  title: "Velinda",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
