import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const batman = {
  id: "01a0b707-7c53-723a-b22b-94416ba17fc0",
  type: "page-type/world-character",
  slug: "batman",
  title: "batman",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.243Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
