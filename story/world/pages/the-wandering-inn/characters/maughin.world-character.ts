import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maughin = {
  id: "01a06580-2494-73d7-a70b-45fc5641e190",
  type: "page-type/world-character",
  slug: "maughin",
  title: "Maughin",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  eventCount: 6,
  firstChapter: 320,
  lastChapter: 791,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
