import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const minerva = {
  id: "01a0b70b-ec13-76d1-b9cd-ac7fa54c5acb",
  type: "page-type/world-character",
  slug: "minerva",
  title: "Minerva",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 273,
  lastChapter: 273,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:26.995Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
