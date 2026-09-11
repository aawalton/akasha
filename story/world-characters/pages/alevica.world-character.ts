import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const alevica = {
  id: "01a06580-2493-7cc3-ab41-6c7dd177bc8b",
  type: "world-character",
  slug: "alevica",
  title: "Alevica",
  world: "the-wandering-inn",
  maxLevel: 34,
  eventCount: 8,
  firstChapter: 714,
  lastChapter: 715,
} as const satisfies WorldCharacter
