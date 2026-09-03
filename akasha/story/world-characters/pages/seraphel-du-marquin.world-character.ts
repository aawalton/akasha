import type { WorldCharacter } from "../world-character.page-type.ts"

export const seraphelDuMarquin = {
  id: "01a06580-2495-7c47-a4b3-4fbc016c5cd9",
  pageTypeSlug: "world-character",
  slug: "seraphel-du-marquin",
  title: "Seraphel du Marquin",
  worldSlug: "the-wandering-inn",
  maxLevel: 27,
  eventCount: 5,
  firstChapter: 574,
  lastChapter: 574,
} as const satisfies WorldCharacter
