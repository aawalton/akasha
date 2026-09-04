import type { WorldCharacter } from "../world-character.page-type.ts"

export const durene = {
  id: "01a06580-2494-7da1-83d2-811ddbe40d10",
  pageTypeSlug: "world-character",
  slug: "durene",
  title: "Durene",
  worldSlug: "the-wandering-inn",
  maxLevel: 17,
  eventCount: 2,
  firstChapter: 355,
  lastChapter: 355,
} as const satisfies WorldCharacter
