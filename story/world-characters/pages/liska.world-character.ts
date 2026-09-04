import type { WorldCharacter } from "../world-character.page-type.ts"

export const liska = {
  id: "01a06580-2494-76e5-b9ca-0757b2955c15",
  pageTypeSlug: "world-character",
  slug: "liska",
  title: "Liska",
  worldSlug: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 7,
  firstChapter: 817,
  lastChapter: 821,
} as const satisfies WorldCharacter
