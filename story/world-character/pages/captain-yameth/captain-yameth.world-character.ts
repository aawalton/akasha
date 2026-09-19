import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainYameth = {
  id: "01a0b707-94ce-74b8-8709-16232d8d77e5",
  type: "page-type/world-character",
  slug: "captain-yameth",
  title: "Yameth",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
