import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grunter = {
  id: "01a0b70a-ec94-76ed-a307-7bf344eb120e",
  type: "page-type/world-character",
  slug: "grunter",
  title: "Grunter",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 143,
  lastChapter: 146,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:21.588Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
