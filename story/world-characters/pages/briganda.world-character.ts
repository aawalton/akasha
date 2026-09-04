import type { WorldCharacter } from "../world-character.page-type.ts"

export const briganda = {
  id: "01a06580-2494-7c23-8934-771d62c0cda5",
  pageTypeSlug: "world-character",
  slug: "briganda",
  title: "Briganda",
  worldSlug: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 3,
  firstChapter: 506,
  lastChapter: 506,
} as const satisfies WorldCharacter
