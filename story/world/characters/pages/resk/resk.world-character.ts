import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const resk = {
  id: "01a0b70c-90c3-7ef0-acdf-a3ba31bc925c",
  type: "page-type/world-character",
  slug: "resk",
  title: "Resk",
  world: "world/the-wandering-inn",
  firstChapter: 575,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
