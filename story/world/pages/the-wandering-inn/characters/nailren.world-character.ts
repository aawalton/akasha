import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nailren = {
  id: "01a06580-2495-78e2-ac4f-3e62948e6605",
  type: "page-type/world-character",
  slug: "nailren",
  title: "Nailren",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  eventCount: 11,
  firstChapter: 268,
  lastChapter: 818,
  characterClaims: "jsonl",
  aliasOf: "world-character/nailren-fletchsing",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
