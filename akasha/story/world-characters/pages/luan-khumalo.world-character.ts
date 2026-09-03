import type { WorldCharacter } from "../world-character.page-type.ts"

export const luanKhumalo = {
  id: "01a06580-2494-77d6-945b-84329d157c7d",
  pageTypeSlug: "world-character",
  slug: "luan-khumalo",
  title: "Luan",
  worldSlug: "the-wandering-inn",
  maxLevel: 14,
  eventCount: 10,
  firstChapter: 497,
  lastChapter: 576,
} as const satisfies WorldCharacter
