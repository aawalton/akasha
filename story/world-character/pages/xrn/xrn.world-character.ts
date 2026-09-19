import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xrn = {
  id: "01a0b70d-d88a-77c9-8cda-f03ad720db1d",
  type: "page-type/world-character",
  slug: "xrn",
  title: "Xrn",
  world: "world/the-wandering-inn",
  firstChapter: 149,
  lastChapter: 811,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
