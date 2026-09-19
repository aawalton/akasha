import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ivolethe = {
  id: "01a0b70b-16fa-7492-8705-fe0ea1d8ea3e",
  type: "page-type/world-character",
  slug: "ivolethe",
  title: "Ivolethe",
  world: "world/the-wandering-inn",
  firstChapter: 128,
  lastChapter: 724,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
