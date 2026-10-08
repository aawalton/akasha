import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bobble = {
  id: "01a0b707-8816-72fc-8dfc-a5db1b916ef7",
  type: "page-type/world-character",
  slug: "bobble",
  title: "Bobble",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 778,
  lastChapter: 778,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:39.254Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
