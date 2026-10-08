import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caveDragon = {
  id: "01a0b705-e74f-7278-9eb8-4bc030975313",
  type: "page-type/world-character",
  slug: "cave-dragon",
  title: "the dragon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 2,
  lastChapter: 2,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:16:52.559Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
