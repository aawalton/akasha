import type { WorldCharacter } from "../world-character.page-type.ts"

export const jelaqua = {
  id: "01a06580-2494-7ded-a97e-0136dd2643f0",
  pageTypeSlug: "world-character",
  slug: "jelaqua",
  title: "Jelaqua",
  worldSlug: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 17,
  firstChapter: 506,
  lastChapter: 789,
} as const satisfies WorldCharacter
