import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cervial = {
  id: "01a0b709-fbef-7572-b059-1ff94573c1e1",
  type: "page-type/world-character",
  slug: "cervial",
  title: "Cervial Dermondy",
  world: "world/the-wandering-inn",
  firstChapter: 40,
  lastChapter: 62,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
