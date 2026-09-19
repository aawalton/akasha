import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const trueshot = {
  id: "01a0b70d-738d-72a9-b2b5-4bcdd7f72cab",
  type: "page-type/world-character",
  slug: "trueshot",
  title: "Trueshot",
  world: "world/the-wandering-inn",
  firstChapter: 721,
  lastChapter: 721,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
