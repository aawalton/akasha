import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const alevica = {
  id: "01a06580-2493-7cc3-ab41-6c7dd177bc8b",
  type: "page-type/world-character",
  slug: "alevica",
  title: "Alevica",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  eventCount: 8,
  firstChapter: 349,
  lastChapter: 746,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.923Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
