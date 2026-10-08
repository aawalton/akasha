import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merrik = {
  id: "01a0b70b-ea4e-760a-9827-96fee2814d6e",
  type: "page-type/world-character",
  slug: "merrik",
  title: "Merrik",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 404,
  lastChapter: 560,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:26.542Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
