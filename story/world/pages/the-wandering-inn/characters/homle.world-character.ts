import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const homle = {
  id: "01a0b70a-ff64-730c-a4b6-6edc6a7cb58c",
  type: "page-type/world-character",
  slug: "homle",
  title: "Homle",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 692,
  lastChapter: 815,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:26.404Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
