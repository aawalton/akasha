import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ylawesByres = {
  id: "01a06580-2495-7300-b2f5-f272e911ffd9",
  type: "page-type/world-character",
  slug: "ylawes-byres",
  title: "Ylawes Byres",
  world: "world/the-wandering-inn",
  maxLevel: 38,
  eventCount: 2,
  firstChapter: 150,
  lastChapter: 818,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
