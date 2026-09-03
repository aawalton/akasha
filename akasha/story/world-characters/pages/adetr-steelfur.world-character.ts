import type { WorldCharacter } from "../world-character.page-type.ts"

export const adetrSteelfur = {
  id: "01a06580-2493-7357-886c-a15d44dc3bb4",
  pageTypeSlug: "world-character",
  slug: "adetr-steelfur",
  title: "Adetr",
  worldSlug: "the-wandering-inn",
  maxLevel: 27,
  eventCount: 2,
  firstChapter: 520,
  lastChapter: 520,
} as const satisfies WorldCharacter
