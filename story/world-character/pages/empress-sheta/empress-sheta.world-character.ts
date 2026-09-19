import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const empressSheta = {
  id: "01a0b70a-6d4a-73f2-9a02-514f9ad23a2f",
  type: "page-type/world-character",
  slug: "empress-sheta",
  title: "Sheta",
  world: "world/the-wandering-inn",
  firstChapter: 426,
  lastChapter: 759,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
