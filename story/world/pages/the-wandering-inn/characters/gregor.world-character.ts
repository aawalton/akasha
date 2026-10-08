import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gregor = {
  id: "01a0b70a-e9de-78e1-9de7-0cc433229b4c",
  type: "page-type/world-character",
  slug: "gregor",
  title: "Gregor",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 50,
  lastChapter: 62,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:20.894Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
