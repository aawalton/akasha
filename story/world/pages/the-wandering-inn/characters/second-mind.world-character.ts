import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const secondMind = {
  id: "01a0b70c-ef8b-7565-a865-d8bf05da3e5e",
  type: "page-type/world-character",
  slug: "second-mind",
  title: "Second Mind",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 617,
  lastChapter: 617,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:33.419Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
