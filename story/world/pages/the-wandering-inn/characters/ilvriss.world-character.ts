import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ilvriss = {
  id: "01a06580-2494-7975-9344-b43b8f13dec0",
  type: "page-type/world-character",
  slug: "ilvriss",
  title: "Ilvriss",
  world: "world/the-wandering-inn",
  maxLevel: 38,
  eventCount: 3,
  firstChapter: 101,
  lastChapter: 824,
  characterClaims: "jsonl",
  aliasOf: "world-character/ilvriss-gemscale",
} as const satisfies WorldCharacter
