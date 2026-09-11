import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const feshiWeatherfur = {
  id: "01a06580-2494-7ef2-8d7d-c94826114f07",
  type: "world-character",
  slug: "feshi-weatherfur",
  title: "Feshi Weatherfur",
  world: "the-wandering-inn",
  maxLevel: 33,
  eventCount: 5,
  firstChapter: 638,
  lastChapter: 638,
} as const satisfies WorldCharacter
