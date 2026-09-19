import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const clatterface = {
  id: "01a0b70a-032c-7a83-a9ec-14e6fa4843cf",
  type: "page-type/world-character",
  slug: "clatterface",
  title: "Clatterface",
  world: "world/the-wandering-inn",
  firstChapter: 731,
  lastChapter: 731,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
