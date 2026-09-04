import type { WorldCharacter } from "../world-character.page-type.ts"

export const kenMurata = {
  id: "01a06580-2494-7dea-99fb-6d1933b7aaa7",
  pageTypeSlug: "world-character",
  slug: "ken-murata",
  title: "Ken",
  worldSlug: "the-wandering-inn",
  maxLevel: 4,
  eventCount: 4,
  firstChapter: 198,
  lastChapter: 198,
} as const satisfies WorldCharacter
