import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bea = {
  id: "01a0b707-7cae-7e0a-9adc-4c2b07429624",
  type: "page-type/world-character",
  slug: "bea",
  title: "Bea",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 102,
  lastChapter: 615,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.334Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
