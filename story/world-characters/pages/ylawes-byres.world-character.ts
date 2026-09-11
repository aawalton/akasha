import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const ylawesByres = {
  id: "01a06580-2495-7300-b2f5-f272e911ffd9",
  type: "world-character",
  slug: "ylawes-byres",
  title: "Ylawes",
  world: "the-wandering-inn",
  maxLevel: 38,
  eventCount: 2,
  firstChapter: 692,
  lastChapter: 692,
} as const satisfies WorldCharacter
