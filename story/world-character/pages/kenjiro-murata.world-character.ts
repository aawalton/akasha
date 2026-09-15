import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kenjiroMurata = {
  id: "01a06580-2494-7bb1-863a-db7fe501fe34",
  type: "page-type/world-character",
  slug: "kenjiro-murata",
  title: "Kenjiro Murata",
  world: "world/the-wandering-inn",
  maxLevel: 4,
  eventCount: 5,
  firstChapter: 196,
  lastChapter: 196,
} as const satisfies WorldCharacter
