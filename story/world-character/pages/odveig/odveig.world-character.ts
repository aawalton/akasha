import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const odveig = {
  id: "01a0b70c-14c9-7468-86fa-9d64c646f645",
  type: "page-type/world-character",
  slug: "odveig",
  title: "Odveig",
  world: "world/the-wandering-inn",
  firstChapter: 202,
  lastChapter: 203,
  characterClaims: "jsonl",
  aliasOf: "world-character/sacra",
} as const satisfies WorldCharacter
