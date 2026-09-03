import type { WorldCharacter } from "../world-character.page-type.ts"

export const dameUshar = {
  id: "01a06580-2494-7c3f-ac00-620d6535f098",
  pageTypeSlug: "world-character",
  slug: "dame-ushar",
  title: "Dame Ushar",
  worldSlug: "the-wandering-inn",
  maxLevel: 30,
  eventCount: 4,
  firstChapter: 745,
  lastChapter: 745,
} as const satisfies WorldCharacter
