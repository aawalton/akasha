import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const humbleActor = {
  id: "01a0b70b-02c1-7d37-bdb2-07363929ac89",
  type: "page-type/world-character",
  slug: "humble-actor",
  title: "Humble Actor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 111,
  lastChapter: 111,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:27.265Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
