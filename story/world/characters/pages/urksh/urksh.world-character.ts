import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const urksh = {
  id: "01a0b70d-824f-7bf7-bed9-7b81ea7153d9",
  type: "page-type/world-character",
  slug: "urksh",
  title: "Urksh",
  world: "world/the-wandering-inn",
  firstChapter: 100,
  lastChapter: 115,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
