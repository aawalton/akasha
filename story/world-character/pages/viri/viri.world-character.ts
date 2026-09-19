import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const viri = {
  id: "01a0b70d-947b-7e2f-83bd-30cd3fd77637",
  type: "page-type/world-character",
  slug: "viri",
  title: "Viri",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 560,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
