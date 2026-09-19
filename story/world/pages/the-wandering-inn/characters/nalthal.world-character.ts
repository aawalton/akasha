import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nalthal = {
  id: "01a0b70b-ffde-7459-bd79-add9fb0733f9",
  type: "page-type/world-character",
  slug: "nalthal",
  title: "Nalthal",
  world: "world/the-wandering-inn",
  firstChapter: 230,
  lastChapter: 230,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
