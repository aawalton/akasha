import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const matha = {
  id: "01a0b70b-9ef0-7fd5-8016-fbf1c4e7fcaf",
  type: "page-type/world-character",
  slug: "matha",
  title: "Matha",
  world: "world/the-wandering-inn",
  firstChapter: 767,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
