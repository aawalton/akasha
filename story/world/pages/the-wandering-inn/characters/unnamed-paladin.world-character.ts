import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const unnamedPaladin = {
  id: "01a0b70d-8195-7ef1-b6ab-e1b47b1291d7",
  type: "page-type/world-character",
  slug: "unnamed-paladin",
  title: "the Dullahan Paladin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 506,
  lastChapter: 506,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:10.805Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
