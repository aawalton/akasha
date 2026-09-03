import type { WorldCharacter } from "../world-character.page-type.ts"

export const moltin = {
  id: "01a06580-2495-7d79-b7c0-20f2e550805e",
  pageTypeSlug: "world-character",
  slug: "moltin",
  title: "Lord Moltin",
  worldSlug: "the-wandering-inn",
  maxLevel: 50,
  eventCount: 2,
  firstChapter: 732,
  lastChapter: 732,
} as const satisfies WorldCharacter
