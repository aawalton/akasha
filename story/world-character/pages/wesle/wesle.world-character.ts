import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wesle = {
  id: "01a0b70d-9cc9-758a-a185-a902b92dd4bf",
  type: "page-type/world-character",
  slug: "wesle",
  title: "Wesle",
  world: "world/the-wandering-inn",
  firstChapter: 119,
  lastChapter: 413,
  characterClaims: "jsonl",
  aliasOf: "world-character/wesle-salkis",
} as const satisfies WorldCharacter
