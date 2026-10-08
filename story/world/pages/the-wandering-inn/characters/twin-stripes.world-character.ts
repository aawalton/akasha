import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twinStripes = {
  id: "01a0b70d-76fc-7cc8-a8d0-0797d4621c9b",
  type: "page-type/world-character",
  slug: "twin-stripes",
  title: "Twin Stripes",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 226,
  lastChapter: 228,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:08.092Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
