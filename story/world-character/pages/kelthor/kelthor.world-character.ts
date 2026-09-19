import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kelthor = {
  id: "01a0b70b-61d0-74c1-9f2c-51a9a9e9f331",
  type: "page-type/world-character",
  slug: "kelthor",
  title: "Kelthor",
  world: "world/the-wandering-inn",
  firstChapter: 94,
  lastChapter: 94,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
