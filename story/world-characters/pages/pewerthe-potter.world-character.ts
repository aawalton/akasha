import type { WorldCharacter } from "../world-character.page-type.ts"

export const pewerthePotter = {
  id: "01a06580-2495-7325-abc0-fdbe29296928",
  pageTypeSlug: "world-character",
  slug: "pewerthe-potter",
  title: "Pewerthe",
  worldSlug: "the-wandering-inn",
  maxLevel: 47,
  eventCount: 6,
  firstChapter: 809,
  lastChapter: 809,
} as const satisfies WorldCharacter
