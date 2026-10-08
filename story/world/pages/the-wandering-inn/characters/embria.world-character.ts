import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const embria = {
  id: "01a06580-2494-74e8-8287-c3a1fe9ed588",
  type: "page-type/world-character",
  slug: "embria",
  title: "Embria",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  eventCount: 5,
  firstChapter: 258,
  lastChapter: 810,
  characterClaims: "jsonl",
  aliasOf: "world-character/embria-grasstongue",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
