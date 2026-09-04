import type { WorldCharacter } from "../world-character.page-type.ts"

export const ksmvr = {
  id: "01a06580-2494-7d42-8eb4-3482b0b04728",
  pageTypeSlug: "world-character",
  slug: "ksmvr",
  title: "Ksmvr",
  worldSlug: "the-wandering-inn",
  maxLevel: 30,
  eventCount: 17,
  firstChapter: 506,
  lastChapter: 637,
} as const satisfies WorldCharacter
