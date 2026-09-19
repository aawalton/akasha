import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rinli = {
  id: "01a0b70c-998f-7fda-8ff0-75a061f69e8c",
  type: "page-type/world-character",
  slug: "rinli",
  title: "Rinli",
  world: "world/the-wandering-inn",
  firstChapter: 788,
  lastChapter: 788,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
