import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kenMurata = {
  id: "01a06580-2494-7dea-99fb-6d1933b7aaa7",
  type: "page-type/world-character",
  slug: "ken-murata",
  title: "Ken",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  eventCount: 4,
  firstChapter: 198,
  lastChapter: 198,
  characterClaims: "jsonl",
  aliasOf: "world-character/kenjiro-murata",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
