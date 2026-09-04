import type { WorldCharacter } from "../world-character.page-type.ts"

export const ilvriss = {
  id: "01a06580-2494-7975-9344-b43b8f13dec0",
  pageTypeSlug: "world-character",
  slug: "ilvriss",
  title: "Ilvriss",
  worldSlug: "the-wandering-inn",
  maxLevel: 38,
  eventCount: 3,
  firstChapter: 821,
  lastChapter: 821,
} as const satisfies WorldCharacter
