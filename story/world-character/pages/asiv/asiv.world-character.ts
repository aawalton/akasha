import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const asiv = {
  id: "01a0b707-752b-7d51-88d9-554e5c9502bd",
  type: "page-type/world-character",
  slug: "asiv",
  title: "Asiv",
  world: "world/the-wandering-inn",
  firstChapter: 760,
  lastChapter: 760,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
