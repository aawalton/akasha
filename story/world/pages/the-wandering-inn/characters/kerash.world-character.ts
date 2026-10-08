import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kerash = {
  id: "01a0b70b-6768-7dd5-b240-5adadaf74d3d",
  type: "page-type/world-character",
  slug: "kerash",
  title: "Kerash",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 102,
  lastChapter: 412,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:53.032Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
