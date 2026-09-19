import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const horre = {
  id: "01a0b70b-0046-7a99-9f03-87211bd13552",
  type: "page-type/world-character",
  slug: "horre",
  title: "Horre",
  world: "world/the-wandering-inn",
  firstChapter: 639,
  lastChapter: 639,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
