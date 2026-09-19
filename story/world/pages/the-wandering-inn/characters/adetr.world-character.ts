import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const adetr = {
  id: "01a0b707-6044-7193-91a6-83771607812e",
  type: "page-type/world-character",
  slug: "adetr",
  title: "Adetr",
  world: "world/the-wandering-inn",
  firstChapter: 564,
  lastChapter: 585,
  characterClaims: "jsonl",
  aliasOf: "world-character/adetr-steelfur",
} as const satisfies WorldCharacter
