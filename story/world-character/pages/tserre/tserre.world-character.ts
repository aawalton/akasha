import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tserre = {
  id: "01a0b70d-73c8-759a-98af-a4975533e35e",
  type: "page-type/world-character",
  slug: "tserre",
  title: "Tserre",
  world: "world/the-wandering-inn",
  firstChapter: 709,
  lastChapter: 774,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
