import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordHayvon = {
  id: "01a0b70b-89cf-7f7a-a13c-2ff2a4ebfbb6",
  type: "page-type/world-character",
  slug: "lord-hayvon",
  title: "Hayvon",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
