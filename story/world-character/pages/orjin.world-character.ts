import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const orjin = {
  id: "01a06580-2495-762b-8ec7-13ac83d2f761",
  type: "page-type/world-character",
  slug: "orjin",
  title: "Orjin",
  world: "world/the-wandering-inn",
  maxLevel: 53,
  eventCount: 12,
  firstChapter: 326,
  lastChapter: 674,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
