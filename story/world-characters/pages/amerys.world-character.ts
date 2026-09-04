import type { WorldCharacter } from "../world-character.page-type.ts"

export const amerys = {
  id: "01a06580-2493-74fd-8fec-96537db2516b",
  pageTypeSlug: "world-character",
  slug: "amerys",
  title: "Amerys",
  worldSlug: "the-wandering-inn",
  maxLevel: 58,
  eventCount: 2,
  firstChapter: 790,
  lastChapter: 790,
} as const satisfies WorldCharacter
