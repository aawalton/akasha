import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const femaleAdventurer = {
  id: "01a0b70a-7de9-7f56-87e5-9a1e5cdb2ba3",
  type: "page-type/world-character",
  slug: "female-adventurer",
  title: "the female adventurer",
  world: "world/the-wandering-inn",
  firstChapter: 155,
  lastChapter: 155,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
