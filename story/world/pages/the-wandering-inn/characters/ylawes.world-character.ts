import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ylawes = {
  id: "01a06580-2495-794c-89b5-ed220b0977c2",
  type: "page-type/world-character",
  slug: "ylawes",
  title: "Ylawes Byres",
  world: "world/the-wandering-inn",
  appearanceCount: 17,
  eventCount: 6,
  firstChapter: 145,
  lastChapter: 814,
  characterClaims: "jsonl",
  aliasOf: "world-character/ylawes-byres",
} as const satisfies WorldCharacter
