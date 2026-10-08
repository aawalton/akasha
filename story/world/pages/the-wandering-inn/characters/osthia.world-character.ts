import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const osthia = {
  id: "01a06580-2495-72cc-8b7a-2c008742ff51",
  type: "page-type/world-character",
  slug: "osthia",
  title: "Osthia",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  eventCount: 18,
  firstChapter: 301,
  lastChapter: 822,
  characterClaims: "jsonl",
  aliasOf: "world-character/osthia-blackwing",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
