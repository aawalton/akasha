import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eldavin = {
  id: "01a06580-2494-7ddb-abe9-0b88773932df",
  type: "page-type/world-character",
  slug: "eldavin",
  title: "Grand Magus Eldavin",
  world: "world/the-wandering-inn",
  appearanceCount: 16,
  firstChapter: 452,
  lastChapter: 586,
  characterClaims: "jsonl",
  aliasOf: "world-character/teriarch",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
