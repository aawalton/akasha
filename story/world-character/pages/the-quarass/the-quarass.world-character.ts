import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theQuarass = {
  id: "01a0b70d-20d5-7202-a1a9-1674f0270a1e",
  type: "page-type/world-character",
  slug: "the-quarass",
  title: "The Quarass",
  world: "world/the-wandering-inn",
  firstChapter: 426,
  lastChapter: 821,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
