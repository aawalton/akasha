import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mrsha = {
  id: "01a06580-2495-70df-86a4-4492ec2e0a03",
  type: "page-type/world-character",
  slug: "mrsha",
  title: "Mrsha",
  world: "world/the-wandering-inn",
  maxLevel: 70,
  eventCount: 49,
  firstChapter: 100,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
