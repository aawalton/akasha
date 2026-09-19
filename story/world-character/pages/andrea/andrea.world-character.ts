import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const andrea = {
  id: "01a0b707-6e86-7cc4-a844-afd0e279d1d9",
  type: "page-type/world-character",
  slug: "andrea",
  title: "Andrea",
  world: "world/the-wandering-inn",
  firstChapter: 801,
  lastChapter: 801,
} as const satisfies WorldCharacter
