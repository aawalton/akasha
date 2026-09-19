import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulkel = {
  id: "01a0b70d-7de1-78d7-83bb-5ba49205b875",
  type: "page-type/world-character",
  slug: "ulkel",
  title: "Ulkel",
  world: "world/the-wandering-inn",
  firstChapter: 356,
  lastChapter: 356,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
