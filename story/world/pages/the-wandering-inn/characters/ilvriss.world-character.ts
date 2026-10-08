import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ilvriss = {
  id: "01a06580-2494-7975-9344-b43b8f13dec0",
  type: "page-type/world-character",
  slug: "ilvriss",
  title: "Ilvriss",
  world: "world/the-wandering-inn",
  appearanceCount: 56,
  eventCount: 3,
  firstChapter: 101,
  lastChapter: 824,
  characterClaims: "jsonl",
  aliasOf: "world-character/ilvriss-gemscale",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
