import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const jasi = {
  id: "01a06580-2494-74e7-a5ee-e93546e37102",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "jasi",
  title: "Jasi",
  world: "the-wandering-inn",
  maxLevel: 25,
  eventCount: 4,
  firstChapter: 382,
  lastChapter: 382,
} as const satisfies WorldCharacter
