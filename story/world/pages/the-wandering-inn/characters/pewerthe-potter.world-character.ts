import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pewerthePotter = {
  id: "01a06580-2495-7325-abc0-fdbe29296928",
  type: "page-type/world-character",
  slug: "pewerthe-potter",
  title: "Pewerthe",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  eventCount: 6,
  firstChapter: 809,
  lastChapter: 809,
  characterClaims: "jsonl",
  aliasOf: "world-character/pewerthe",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
