import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const adoive = {
  id: "01a0b707-64a7-7efa-88f7-41441e8bfca6",
  type: "page-type/world-character",
  slug: "adoive",
  title: "Adoive",
  world: "world/the-wandering-inn",
  firstChapter: 807,
  lastChapter: 808,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
