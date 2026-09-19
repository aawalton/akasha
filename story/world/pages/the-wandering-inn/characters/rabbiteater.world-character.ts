import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rabbiteater = {
  id: "01a06580-2495-77ff-9746-9386eb4b0d89",
  type: "page-type/world-character",
  slug: "rabbiteater",
  title: "Rabbiteater",
  world: "world/the-wandering-inn",
  maxLevel: 40,
  eventCount: 38,
  firstChapter: 219,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
