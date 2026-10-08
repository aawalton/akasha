import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const laken = {
  id: "01a06580-2494-7c73-9a5c-51fec618b692",
  type: "page-type/world-character",
  slug: "laken",
  title: "Laken",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  eventCount: 21,
  firstChapter: 125,
  lastChapter: 763,
  characterClaims: "jsonl",
  aliasOf: "world-character/laken-godart",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
