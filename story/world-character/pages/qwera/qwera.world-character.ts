import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const qwera = {
  id: "01a0b70c-7cdb-7e18-b2bc-98a18d211d42",
  type: "page-type/world-character",
  slug: "qwera",
  title: "Qwera",
  world: "world/the-wandering-inn",
  firstChapter: 535,
  lastChapter: 814,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
