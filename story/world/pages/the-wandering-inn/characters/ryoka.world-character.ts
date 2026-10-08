import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ryoka = {
  id: "01a06580-2495-7e14-bf66-b3078bde8b83",
  type: "page-type/world-character",
  slug: "ryoka",
  title: "Ryoka",
  world: "world/the-wandering-inn",
  appearanceCount: 64,
  eventCount: 2,
  firstChapter: 22,
  lastChapter: 699,
  characterClaims: "jsonl",
  aliasOf: "world-character/ryoka-griffin",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
