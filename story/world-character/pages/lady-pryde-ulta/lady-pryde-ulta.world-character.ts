import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyPrydeUlta = {
  id: "01a0b70b-74b6-7f37-9311-6a82941925e3",
  type: "page-type/world-character",
  slug: "lady-pryde-ulta",
  title: "Lady Pryde",
  world: "world/the-wandering-inn",
  firstChapter: 378,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
