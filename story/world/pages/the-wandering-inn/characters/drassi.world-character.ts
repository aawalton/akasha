import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const drassi = {
  id: "01a06580-2494-7e25-95ab-fee74eeee689",
  type: "page-type/world-character",
  slug: "drassi",
  title: "Drassi",
  world: "world/the-wandering-inn",
  appearanceCount: 18,
  eventCount: 2,
  firstChapter: 13,
  lastChapter: 803,
  characterClaims: "jsonl",
  aliasOf: "world-character/drassi-tewing",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
