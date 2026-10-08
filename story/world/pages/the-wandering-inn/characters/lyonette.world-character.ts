import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lyonette = {
  id: "01a06580-2494-738a-aa8f-89b000c9099d",
  type: "page-type/world-character",
  slug: "lyonette",
  title: "Lyonette du Marquin",
  world: "world/the-wandering-inn",
  appearanceCount: 109,
  eventCount: 50,
  firstChapter: 95,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/lyonette-du-marquin",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
