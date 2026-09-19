import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hayvon = {
  id: "01a0b70a-f3b1-7af9-9ab1-6bdca71e3ee1",
  type: "page-type/world-character",
  slug: "hayvon",
  title: "Hayvon",
  world: "world/the-wandering-inn",
  firstChapter: 625,
  lastChapter: 625,
  characterClaims: "jsonl",
  aliasOf: "world-character/hayvon-operland",
} as const satisfies WorldCharacter
