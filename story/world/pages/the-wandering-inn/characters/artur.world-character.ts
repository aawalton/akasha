import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const artur = {
  id: "01a06580-2493-743d-badb-3f9020377317",
  type: "page-type/world-character",
  slug: "artur",
  title: "Artur",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  eventCount: 11,
  firstChapter: 562,
  lastChapter: 605,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.923Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
