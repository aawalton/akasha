import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hoisq = {
  id: "01a0b70a-ff2b-7759-b6ab-d1d15c1ac1ec",
  type: "page-type/world-character",
  slug: "hoisq",
  title: "Hoisq",
  world: "world/the-wandering-inn",
  firstChapter: 696,
  lastChapter: 698,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
