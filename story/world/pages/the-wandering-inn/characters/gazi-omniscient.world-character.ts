import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gaziOmniscient = {
  id: "01a0b70a-9441-78db-ae0e-c8d658396b67",
  type: "page-type/world-character",
  slug: "gazi-omniscient",
  title: "Gazi",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 50,
  lastChapter: 704,
  characterClaims: "jsonl",
  aliasOf: "world-character/gazi",
  createdAt: "2026-09-19T00:21:58.977Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
