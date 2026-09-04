import type { WorldCharacter } from "../world-character.page-type.ts"

export const insill = {
  id: "01a06580-2494-7d3e-a26e-8b621811dae0",
  pageTypeSlug: "world-character",
  slug: "insill",
  title: "Insill",
  worldSlug: "the-wandering-inn",
  maxLevel: 28,
  eventCount: 2,
  firstChapter: 622,
  lastChapter: 622,
} as const satisfies WorldCharacter
