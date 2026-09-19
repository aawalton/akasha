import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const reiss = {
  id: "01a0b70c-8d17-72c6-adbd-ef751df6fed5",
  type: "page-type/world-character",
  slug: "reiss",
  title: "Reiss",
  world: "world/the-wandering-inn",
  firstChapter: 238,
  lastChapter: 627,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
