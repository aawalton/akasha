import type { WorldCharacter } from "../world-character.page-type.ts"

export const larra = {
  id: "01a06580-2494-7f37-8079-a65fa38caa17",
  pageTypeSlug: "world-character",
  slug: "larra",
  title: "Larra",
  worldSlug: "the-wandering-inn",
  maxLevel: 48,
  eventCount: 3,
  firstChapter: 616,
  lastChapter: 616,
} as const satisfies WorldCharacter
