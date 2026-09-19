import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kenMurata = {
  id: "01a06580-2494-7dea-99fb-6d1933b7aaa7",
  type: "page-type/world-character",
  slug: "ken-murata",
  title: "Ken",
  world: "world/the-wandering-inn",
  maxLevel: 4,
  eventCount: 4,
  firstChapter: 198,
  lastChapter: 198,
  characterClaims: "jsonl",
  aliasOf: "world-character/kenjiro-murata",
} as const satisfies WorldCharacter
