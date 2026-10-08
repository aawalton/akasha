import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const teresa = {
  id: "01a0b70d-17b1-7f0b-a2e3-3eb695edb97e",
  type: "page-type/world-character",
  slug: "teresa",
  title: "Teresa",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 92,
  lastChapter: 735,
  characterClaims: "jsonl",
  aliasOf: "world-character/teresa-atwood",
  createdAt: "2026-09-19T00:24:43.697Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
