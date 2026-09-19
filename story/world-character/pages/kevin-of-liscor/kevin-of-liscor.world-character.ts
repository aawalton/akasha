import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kevinOfLiscor = {
  id: "01a0b70b-6872-76e9-ac01-07df956178e4",
  type: "page-type/world-character",
  slug: "kevin-of-liscor",
  title: "Kevin",
  world: "world/the-wandering-inn",
  firstChapter: 487,
  lastChapter: 487,
  characterClaims: "jsonl",
  aliasOf: "world-character/kevin",
} as const satisfies WorldCharacter
