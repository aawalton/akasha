import type { WorldCharacter } from "../world-character.page-type.ts"

export const embria = {
  id: "01a06580-2494-74e8-8287-c3a1fe9ed588",
  pageTypeSlug: "world-character",
  slug: "embria",
  title: "Embria",
  worldSlug: "the-wandering-inn",
  maxLevel: 29,
  eventCount: 5,
  firstChapter: 563,
  lastChapter: 650,
} as const satisfies WorldCharacter
