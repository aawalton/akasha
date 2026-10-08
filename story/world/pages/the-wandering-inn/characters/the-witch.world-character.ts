import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theWitch = {
  id: "01a0b70d-2204-75ab-8e80-eeddd22f404c",
  type: "page-type/world-character",
  slug: "the-witch",
  title: "the Witch of Noelictus",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 345,
  lastChapter: 345,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:46.340Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
