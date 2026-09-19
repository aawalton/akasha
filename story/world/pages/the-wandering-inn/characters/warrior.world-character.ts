import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const warrior = {
  id: "01a0b70d-9a3b-75e1-8882-61d66133b63d",
  type: "page-type/world-character",
  slug: "warrior",
  title: "the creature in the crevasse",
  world: "world/the-wandering-inn",
  firstChapter: 749,
  lastChapter: 749,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
