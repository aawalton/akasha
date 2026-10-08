import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bird = {
  id: "01a06580-2494-7871-b674-a99406200efd",
  type: "page-type/world-character",
  slug: "bird",
  title: "Bird",
  world: "world/the-wandering-inn",
  appearanceCount: 64,
  eventCount: 29,
  firstChapter: 65,
  lastChapter: 763,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
