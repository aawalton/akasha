import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const asale = {
  id: "01a0b707-742c-7b83-8bdf-cb69ae811d82",
  type: "page-type/world-character",
  slug: "asale",
  title: "Asale",
  world: "world/the-wandering-inn",
  firstChapter: 484,
  lastChapter: 484,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
