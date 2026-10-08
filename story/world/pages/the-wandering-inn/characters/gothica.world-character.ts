import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gothica = {
  id: "01a06580-2494-7690-a8b5-0c37549f50ed",
  type: "page-type/world-character",
  slug: "gothica",
  title: "Gothica",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  eventCount: 7,
  firstChapter: 532,
  lastChapter: 747,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
