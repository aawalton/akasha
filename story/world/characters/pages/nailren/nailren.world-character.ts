import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nailren = {
  id: "01a06580-2495-78e2-ac4f-3e62948e6605",
  type: "page-type/world-character",
  slug: "nailren",
  title: "Nailren",
  world: "world/the-wandering-inn",
  maxLevel: 33,
  eventCount: 11,
  firstChapter: 268,
  lastChapter: 818,
  characterClaims: "jsonl",
  aliasOf: "world-character/nailren-fletchsing",
} as const satisfies WorldCharacter
