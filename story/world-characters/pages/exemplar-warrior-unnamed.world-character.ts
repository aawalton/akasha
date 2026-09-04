import type { WorldCharacter } from "../world-character.page-type.ts"

export const exemplarWarriorUnnamed = {
  id: "01a06580-2494-7dd3-b3cb-9cefe751790b",
  pageTypeSlug: "world-character",
  slug: "exemplar-warrior-unnamed",
  title: "Exemplar Warrior",
  worldSlug: "the-wandering-inn",
  maxLevel: 17,
  eventCount: 7,
  firstChapter: 532,
  lastChapter: 532,
} as const satisfies WorldCharacter
