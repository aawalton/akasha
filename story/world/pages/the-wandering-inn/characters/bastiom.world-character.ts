import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bastiom = {
  id: "01a0b707-7bf7-702b-a0d0-544970b46bf2",
  type: "page-type/world-character",
  slug: "bastiom",
  title: "Bastiom",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 199,
  lastChapter: 575,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.151Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
