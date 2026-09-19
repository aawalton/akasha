import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gorry = {
  id: "01a0b70a-e615-7ee4-a674-9eb38fb3edb4",
  type: "page-type/world-character",
  slug: "gorry",
  title: "Gorry",
  world: "world/the-wandering-inn",
  firstChapter: 548,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
