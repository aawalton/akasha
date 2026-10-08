import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const georgie = {
  id: "01a0b70a-9ae8-7f24-b79b-189057cc0775",
  type: "page-type/world-character",
  slug: "georgie",
  title: "Georgie",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 820,
  lastChapter: 821,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:00.680Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
