import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rosencrantz = {
  id: "01a0b70c-9f83-751c-a75a-0898727f9bd7",
  type: "page-type/world-character",
  slug: "rosencrantz",
  title: "Rosencrantz",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 707,
  lastChapter: 751,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:12.931Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
