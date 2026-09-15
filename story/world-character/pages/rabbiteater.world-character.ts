import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rabbiteater = {
  id: "01a06580-2495-77ff-9746-9386eb4b0d89",
  type: "page-type/world-character",
  slug: "rabbiteater",
  title: "Rabbiteater",
  world: "world/the-wandering-inn",
  maxLevel: 40,
  eventCount: 38,
  firstChapter: 283,
  lastChapter: 731,
} as const satisfies WorldCharacter
