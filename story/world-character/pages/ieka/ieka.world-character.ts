import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ieka = {
  id: "01a0b70b-03b3-7d97-a8a2-999906711fa0",
  type: "page-type/world-character",
  slug: "ieka",
  title: "Ieka",
  world: "world/the-wandering-inn",
  firstChapter: 296,
  lastChapter: 296,
  characterClaims: "jsonl",
  aliasOf: "world-character/ieka-imarris",
} as const satisfies WorldCharacter
