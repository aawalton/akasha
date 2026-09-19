import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bizine = {
  id: "01a0b707-8634-7b3b-8ec7-01326f6d480d",
  type: "page-type/world-character",
  slug: "bizine",
  title: "Bizine",
  world: "world/the-wandering-inn",
  firstChapter: 795,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
