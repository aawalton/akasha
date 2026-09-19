import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const butler = {
  id: "01a0b707-8b9f-7458-aad9-d21a33c2445d",
  type: "page-type/world-character",
  slug: "butler",
  title: "the butler",
  world: "world/the-wandering-inn",
  firstChapter: 105,
  lastChapter: 105,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
