import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const harveyProphet = {
  id: "01a0b70a-f2a7-758d-b67b-1761e4cf0cf7",
  type: "page-type/world-character",
  slug: "harvey-prophet",
  title: "Harvey",
  world: "world/the-wandering-inn",
  firstChapter: 808,
  lastChapter: 809,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
