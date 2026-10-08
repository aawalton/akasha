import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const faerieKing = {
  id: "01a0b70a-794e-7570-bd89-09da32997fe8",
  type: "page-type/world-character",
  slug: "faerie-king",
  title: "Faerie King",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 480,
  lastChapter: 724,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:52.078Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
