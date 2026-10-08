import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cotm = {
  id: "01a0b70a-0925-7da2-8c47-0cdd2263a150",
  type: "page-type/world-character",
  slug: "cotm",
  title: "Cotm",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 575,
  lastChapter: 575,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:23.365Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
