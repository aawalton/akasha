import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nereshal = {
  id: "01a0b70c-052d-706d-b4bc-d71bef8c37dd",
  type: "page-type/world-character",
  slug: "nereshal",
  title: "Nereshal",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 625,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
