import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const paethex = {
  id: "01a0b70c-1fd8-716c-bb6d-0b04dcfba60f",
  type: "page-type/world-character",
  slug: "paethex",
  title: "Paethex",
  world: "world/the-wandering-inn",
  firstChapter: 536,
  lastChapter: 536,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
