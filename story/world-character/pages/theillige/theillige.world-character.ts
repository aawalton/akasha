import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theillige = {
  id: "01a0b70d-22a9-7090-b9cb-a8c9ec14a099",
  type: "page-type/world-character",
  slug: "theillige",
  title: "Theillige",
  world: "world/the-wandering-inn",
  firstChapter: 678,
  lastChapter: 678,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
