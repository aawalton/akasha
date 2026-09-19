import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const stalker = {
  id: "01a0b70d-0e78-729c-b18e-48af5e33cd86",
  type: "page-type/world-character",
  slug: "stalker",
  title: "Stalker",
  world: "world/the-wandering-inn",
  firstChapter: 284,
  lastChapter: 284,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
