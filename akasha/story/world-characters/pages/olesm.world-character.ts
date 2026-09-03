import type { WorldCharacter } from "../world-character.page-type.ts"

export const olesm = {
  id: "01a06580-2495-7c82-9dcf-360b73bf75ef",
  pageTypeSlug: "world-character",
  slug: "olesm",
  title: "Olesm",
  worldSlug: "the-wandering-inn",
  maxLevel: 35,
  eventCount: 18,
  firstChapter: 223,
  lastChapter: 563,
} as const satisfies WorldCharacter
