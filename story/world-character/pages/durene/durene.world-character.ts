import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const durene = {
  id: "01a06580-2494-7da1-83d2-811ddbe40d10",
  type: "page-type/world-character",
  slug: "durene",
  title: "Durene",
  world: "world/the-wandering-inn",
  maxLevel: 17,
  eventCount: 2,
  firstChapter: 124,
  lastChapter: 476,
  characterClaims: "jsonl",
  aliasOf: "world-character/durene-faerise",
} as const satisfies WorldCharacter
