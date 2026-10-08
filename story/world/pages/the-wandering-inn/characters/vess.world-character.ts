import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vess = {
  id: "01a06580-2495-71d2-9f62-69a8829b544a",
  type: "page-type/world-character",
  slug: "vess",
  title: "Vess",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  eventCount: 4,
  firstChapter: 562,
  lastChapter: 747,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
