import type { WorldCharacter } from "../world-character.page-type.ts"

export const azKerash = {
  id: "01a06580-2494-7b32-95c9-6744876a1f76",
  pageTypeSlug: "world-character",
  slug: "az-kerash",
  title: "Az'kerash",
  worldSlug: "the-wandering-inn",
  maxLevel: 78,
  eventCount: 6,
  firstChapter: 614,
  lastChapter: 614,
} as const satisfies WorldCharacter
