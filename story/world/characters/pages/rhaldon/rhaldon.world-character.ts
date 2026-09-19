import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rhaldon = {
  id: "01a06580-2495-708e-9dd0-ef2db53b50a5",
  type: "page-type/world-character",
  slug: "rhaldon",
  title: "Rhaldon",
  world: "world/the-wandering-inn",
  maxLevel: 15,
  eventCount: 20,
  firstChapter: 590,
  lastChapter: 675,
  characterClaims: "jsonl",
  aliasOf: "world-character/rhaldon-flemmens",
} as const satisfies WorldCharacter
