import type { WorldCharacter } from "../world-character.page-type.types.ts"

export const zailGemscale = {
  id: "01a06580-2495-72c4-90d0-82c39c88cce7",
  pageTypeSlug: "world-character",
  type: "world-character",
  slug: "zail-gemscale",
  title: "Wall Lord Zail Gemscale",
  world: "the-wandering-inn",
  maxLevel: 44,
  eventCount: 2,
  firstChapter: 662,
  lastChapter: 662,
} as const satisfies WorldCharacter
