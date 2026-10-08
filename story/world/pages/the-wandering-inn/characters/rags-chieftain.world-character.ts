import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ragsChieftain = {
  id: "01a06580-2495-743b-8f6d-ca2a50e6047c",
  type: "page-type/world-character",
  slug: "rags-chieftain",
  title: "Rags",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  eventCount: 9,
  firstChapter: 741,
  lastChapter: 764,
  characterClaims: "jsonl",
  aliasOf: "world-character/rags",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
