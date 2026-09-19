import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ferkr = {
  id: "01a0b70a-8105-7fe7-90a9-0f69f5778c40",
  type: "page-type/world-character",
  slug: "ferkr",
  title: "Ferkr",
  world: "world/the-wandering-inn",
  firstChapter: 352,
  lastChapter: 746,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
