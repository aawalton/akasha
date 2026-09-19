import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gershalOfVaunt = {
  id: "01a0b70a-9cab-7d8a-842e-0dd69960b45e",
  type: "page-type/world-character",
  slug: "gershal-of-vaunt",
  title: "Gershal",
  world: "world/the-wandering-inn",
  firstChapter: 604,
  lastChapter: 680,
  characterClaims: "jsonl",
  aliasOf: "world-character/gershal",
} as const satisfies WorldCharacter
