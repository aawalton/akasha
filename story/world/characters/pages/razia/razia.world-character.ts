import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const razia = {
  id: "01a0b70c-881a-79fd-9e41-18a75ea8e97a",
  type: "page-type/world-character",
  slug: "razia",
  title: "Razia",
  world: "world/the-wandering-inn",
  firstChapter: 581,
  lastChapter: 678,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
