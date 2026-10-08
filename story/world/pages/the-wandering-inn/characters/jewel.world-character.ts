import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jewel = {
  id: "01a0b70b-1fa1-7e21-a468-0982ff80a5b9",
  type: "page-type/world-character",
  slug: "jewel",
  title: "Jewel",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 588,
  lastChapter: 747,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:34.657Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
