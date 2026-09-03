import type { WorldCharacter } from "../world-character.page-type.ts"

export const nerulGemscale = {
  id: "01a06580-2495-7c1a-b3fd-7fbbaae22f08",
  pageTypeSlug: "world-character",
  slug: "nerul-gemscale",
  title: "Nerul Gemscale",
  worldSlug: "the-wandering-inn",
  maxLevel: 48,
  eventCount: 5,
  firstChapter: 824,
  lastChapter: 824,
} as const satisfies WorldCharacter
