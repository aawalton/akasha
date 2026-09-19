import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const majorHotwing = {
  id: "01a0b70b-98e2-7e61-8779-e115b13456aa",
  type: "page-type/world-character",
  slug: "major-hotwing",
  title: "Major Hotwing",
  world: "world/the-wandering-inn",
  firstChapter: 754,
  lastChapter: 754,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
