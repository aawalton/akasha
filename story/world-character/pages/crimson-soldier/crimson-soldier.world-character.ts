import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const crimsonSoldier = {
  id: "01a0b70a-09ba-7c41-8e04-1a15bd123576",
  type: "page-type/world-character",
  slug: "crimson-soldier",
  title: "the Crimson Soldier",
  world: "world/the-wandering-inn",
  firstChapter: 560,
  lastChapter: 560,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
