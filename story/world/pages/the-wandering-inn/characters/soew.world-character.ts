import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const soew = {
  id: "01a0b70d-0800-7796-a9a6-c96ad717273c",
  type: "page-type/world-character",
  slug: "soew",
  title: "Soew",
  world: "world/the-wandering-inn",
  firstChapter: 504,
  lastChapter: 504,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
