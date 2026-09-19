import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wil = {
  id: "01a0b70d-9dec-7726-abfa-0e9019f5a53e",
  type: "page-type/world-character",
  slug: "wil",
  title: "Wil",
  world: "world/the-wandering-inn",
  firstChapter: 207,
  lastChapter: 635,
  characterClaims: "jsonl",
  aliasOf: "world-character/wil-kallinad",
} as const satisfies WorldCharacter
