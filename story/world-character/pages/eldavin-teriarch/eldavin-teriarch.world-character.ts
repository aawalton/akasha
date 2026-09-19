import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eldavinTeriarch = {
  id: "01a0b70a-2636-7630-a971-e098ca7fd475",
  type: "page-type/world-character",
  slug: "eldavin-teriarch",
  title: "Eldavin",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 501,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
