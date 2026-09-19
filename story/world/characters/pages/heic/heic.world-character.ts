import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const heic = {
  id: "01a0b70a-f75d-7304-bb62-03a10b6e58ae",
  type: "page-type/world-character",
  slug: "heic",
  title: "Heic",
  world: "world/the-wandering-inn",
  firstChapter: 370,
  lastChapter: 370,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
