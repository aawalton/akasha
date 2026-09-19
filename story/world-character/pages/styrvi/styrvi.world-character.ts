import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const styrvi = {
  id: "01a0b70d-1030-738a-932b-7a6b38c9ec75",
  type: "page-type/world-character",
  slug: "styrvi",
  title: "Styrvi",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
