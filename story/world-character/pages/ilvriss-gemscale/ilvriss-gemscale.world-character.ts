import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ilvrissGemscale = {
  id: "01a0b70b-0a37-7900-9d1b-7f43f719c9f4",
  type: "page-type/world-character",
  slug: "ilvriss-gemscale",
  title: "Ilvriss Gemscale",
  world: "world/the-wandering-inn",
  firstChapter: 241,
  lastChapter: 241,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
