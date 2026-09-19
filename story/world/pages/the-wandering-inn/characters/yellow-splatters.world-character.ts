import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yellowSplatters = {
  id: "01a0b70d-d9be-7e7b-9ff0-88d9a0f2f2eb",
  type: "page-type/world-character",
  slug: "yellow-splatters",
  title: "Yellow Splatters",
  world: "world/the-wandering-inn",
  firstChapter: 226,
  lastChapter: 809,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
