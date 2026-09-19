import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zevara = {
  id: "01a06580-2495-7afc-97ce-f7f01120a61b",
  type: "page-type/world-character",
  slug: "zevara",
  title: "Zevara",
  world: "world/the-wandering-inn",
  maxLevel: 38,
  eventCount: 12,
  firstChapter: 31,
  lastChapter: 780,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
