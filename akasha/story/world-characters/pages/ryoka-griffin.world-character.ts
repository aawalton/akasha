import type { WorldCharacter } from "../world-character.page-type.ts"

export const ryokaGriffin = {
  id: "01a06580-2495-75a6-80f6-47528af154ec",
  pageTypeSlug: "world-character",
  slug: "ryoka-griffin",
  title: "Ryoka",
  worldSlug: "the-wandering-inn",
  maxLevel: 8,
  eventCount: 5,
  firstChapter: 107,
  lastChapter: 107,
} as const satisfies WorldCharacter
