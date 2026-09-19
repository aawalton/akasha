import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calla = {
  id: "01a0b707-901d-71c8-9f3b-a9ce4f7ac032",
  type: "page-type/world-character",
  slug: "calla",
  title: "Calla",
  world: "world/the-wandering-inn",
  firstChapter: 791,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
