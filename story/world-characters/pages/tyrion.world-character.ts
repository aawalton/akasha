import type { WorldCharacter } from "../world-character.page-type.ts"

export const tyrion = {
  id: "01a06580-2495-7bbd-ab01-957ce84b8c7f",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "tyrion",
  title: "Lord Tyrion",
  world: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 11,
  firstChapter: 574,
  lastChapter: 649,
} as const satisfies WorldCharacter
