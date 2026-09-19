import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salamani = {
  id: "01a0b70c-a8e8-7c98-9a7a-5c67f70fa1b8",
  type: "page-type/world-character",
  slug: "salamani",
  title: "Salamani",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 468,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
