import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eloiseTeaWitch = {
  id: "01a0b70a-6686-7d11-bb85-86cdd99ddb57",
  type: "page-type/world-character",
  slug: "eloise-tea-witch",
  title: "Eloise",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 519,
  lastChapter: 715,
  characterClaims: "jsonl",
  aliasOf: "world-character/eloise",
  createdAt: "2026-09-19T00:21:47.270Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
