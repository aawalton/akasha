import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const warrior = {
  id: "01a0b70d-9a3b-75e1-8882-61d66133b63d",
  type: "page-type/world-character",
  slug: "warrior",
  title: "the creature in the crevasse",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 749,
  lastChapter: 749,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:17.115Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
