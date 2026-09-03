import type { WorldCharacter } from "../world-character.page-type.ts"

export const rabbiteater = {
  id: "01a06580-2495-77ff-9746-9386eb4b0d89",
  pageTypeSlug: "world-character",
  slug: "rabbiteater",
  title: "Rabbiteater",
  worldSlug: "the-wandering-inn",
  maxLevel: 40,
  eventCount: 38,
  firstChapter: 283,
  lastChapter: 731,
} as const satisfies WorldCharacter
