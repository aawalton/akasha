import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rhaldon = {
  id: "01a06580-2495-708e-9dd0-ef2db53b50a5",
  type: "page-type/world-character",
  slug: "rhaldon",
  title: "Rhaldon",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  eventCount: 20,
  firstChapter: 590,
  lastChapter: 675,
  characterClaims: "jsonl",
  aliasOf: "world-character/rhaldon-flemmens",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
