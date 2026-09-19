import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const osthia = {
  id: "01a06580-2495-72cc-8b7a-2c008742ff51",
  type: "page-type/world-character",
  slug: "osthia",
  title: "Osthia",
  world: "world/the-wandering-inn",
  maxLevel: 35,
  eventCount: 18,
  firstChapter: 301,
  lastChapter: 822,
  characterClaims: "jsonl",
  aliasOf: "world-character/osthia-blackwing",
} as const satisfies WorldCharacter
