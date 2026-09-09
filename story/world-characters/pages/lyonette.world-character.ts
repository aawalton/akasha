import type { WorldCharacter } from "../world-character.page-type.ts"

export const lyonette = {
  id: "01a06580-2494-738a-aa8f-89b000c9099d",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "lyonette",
  title: "Lion Solstice",
  world: "the-wandering-inn",
  maxLevel: 41,
  eventCount: 50,
  firstChapter: 148,
  lastChapter: 781,
} as const satisfies WorldCharacter
