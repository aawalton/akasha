import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eurise = {
  id: "01a0b70a-7597-7bf7-b183-880514daee74",
  type: "page-type/world-character",
  slug: "eurise",
  title: "Eurise",
  world: "world/the-wandering-inn",
  firstChapter: 712,
  lastChapter: 803,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
