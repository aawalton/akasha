import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const liska = {
  id: "01a06580-2494-76e5-b9ca-0757b2955c15",
  type: "page-type/world-character",
  slug: "liska",
  title: "Liska",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  eventCount: 7,
  firstChapter: 610,
  lastChapter: 821,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
