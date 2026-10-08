import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const erin = {
  id: "01a06580-2494-765b-b42d-40f9c2d72f04",
  type: "page-type/world-character",
  slug: "erin",
  title: "Erin Solstice",
  world: "world/the-wandering-inn",
  appearanceCount: 233,
  eventCount: 140,
  firstChapter: 3,
  lastChapter: 786,
  characterClaims: "jsonl",
  aliasOf: "world-character/erin-solstice",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
