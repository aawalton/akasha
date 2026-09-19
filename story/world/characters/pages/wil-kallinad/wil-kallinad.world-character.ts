import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wilKallinad = {
  id: "01a0b70d-9e27-7a3b-b0de-954a2d8d1fb3",
  type: "page-type/world-character",
  slug: "wil-kallinad",
  title: "Wil",
  world: "world/the-wandering-inn",
  firstChapter: 333,
  lastChapter: 520,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
