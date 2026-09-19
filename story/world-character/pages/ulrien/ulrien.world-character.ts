import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ulrien = {
  id: "01a0b70d-7e5c-774c-839f-eace9e1ea13f",
  type: "page-type/world-character",
  slug: "ulrien",
  title: "Ulrien",
  world: "world/the-wandering-inn",
  firstChapter: 94,
  lastChapter: 213,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
