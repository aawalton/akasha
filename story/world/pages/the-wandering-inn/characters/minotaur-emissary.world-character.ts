import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const minotaurEmissary = {
  id: "01a06580-2495-7f9e-b299-d35f46bab375",
  type: "page-type/world-character",
  slug: "minotaur-emissary",
  title: "the Minotaur",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  eventCount: 2,
  firstChapter: 183,
  lastChapter: 183,
  characterClaims: "jsonl",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
