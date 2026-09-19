import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lulv = {
  id: "01a0b70b-9004-7c70-b1fd-693bd9b1a9fd",
  type: "page-type/world-character",
  slug: "lulv",
  title: "Lulv",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 810,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
