import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const alienCommander = {
  id: "01a0b707-69bf-7d8d-a65c-94629025f8d8",
  type: "page-type/world-character",
  slug: "alien-commander",
  title: "the Alien Commander",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 481,
  lastChapter: 481,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:31.487Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
