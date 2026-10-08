import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const belgrade = {
  id: "01a06580-2494-7cdd-accf-63dafbc69ed4",
  type: "page-type/world-character",
  slug: "belgrade",
  title: "Belgrade",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  eventCount: 5,
  firstChapter: 147,
  lastChapter: 562,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
