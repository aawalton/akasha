import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const satar = {
  id: "01a06580-2495-7036-95a2-fadb68f43e24",
  type: "page-type/world-character",
  slug: "satar",
  title: "Satar",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  eventCount: 10,
  firstChapter: 564,
  lastChapter: 807,
  characterClaims: "jsonl",
  aliasOf: "world-character/satar-silverfang",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
