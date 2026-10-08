import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vandum = {
  id: "01a06580-2495-712c-a983-628df7c1d48a",
  type: "page-type/world-character",
  slug: "vandum",
  title: "Vandum",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  eventCount: 4,
  firstChapter: 636,
  lastChapter: 671,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
