import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const feshiWeatherfur = {
  id: "01a06580-2494-7ef2-8d7d-c94826114f07",
  type: "page-type/world-character",
  slug: "feshi-weatherfur",
  title: "Feshi Weatherfur",
  world: "world/the-wandering-inn",
  maxLevel: 33,
  eventCount: 5,
  firstChapter: 417,
  lastChapter: 638,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
