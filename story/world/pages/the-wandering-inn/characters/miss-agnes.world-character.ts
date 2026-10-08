import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const missAgnes = {
  id: "01a0b70b-efa7-7505-b65b-6d90e98bcceb",
  type: "page-type/world-character",
  slug: "miss-agnes",
  title: "Miss Agnes",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 142,
  lastChapter: 200,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:27.911Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
