import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const corek = {
  id: "01a0b70a-07c1-7cb2-b856-e99899fa6115",
  type: "page-type/world-character",
  slug: "corek",
  title: "Corek",
  world: "world/the-wandering-inn",
  firstChapter: 608,
  lastChapter: 608,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
