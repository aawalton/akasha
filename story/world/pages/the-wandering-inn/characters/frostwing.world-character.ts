import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const frostwing = {
  id: "01a0b70a-8dc6-70ce-933a-61bd935751df",
  type: "page-type/world-character",
  slug: "frostwing",
  title: "Frostwing",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 173,
  lastChapter: 204,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:57.318Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
