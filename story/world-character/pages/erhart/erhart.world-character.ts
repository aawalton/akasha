import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const erhart = {
  id: "01a0b70a-6e70-7e22-81bf-0087ab253f5d",
  type: "page-type/world-character",
  slug: "erhart",
  title: "Erhart",
  world: "world/the-wandering-inn",
  firstChapter: 203,
  lastChapter: 203,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
