import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sostrom = {
  id: "01a0b70d-0ae4-7856-8c9f-e6d55420f4e5",
  type: "page-type/world-character",
  slug: "sostrom",
  title: "Sostrom",
  world: "world/the-wandering-inn",
  firstChapter: 57,
  lastChapter: 68,
  characterClaims: "jsonl",
  aliasOf: "world-character/sostrom-reidez",
} as const satisfies WorldCharacter
