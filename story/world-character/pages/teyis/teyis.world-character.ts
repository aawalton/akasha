import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const teyis = {
  id: "01a0b70d-1ace-77c7-9a64-5c5998d83ab1",
  type: "page-type/world-character",
  slug: "teyis",
  title: "Teyis",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
