import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ken = {
  id: "01a0b70b-6206-71e8-a8f7-3e1d5c0e2b79",
  type: "page-type/world-character",
  slug: "ken",
  title: "Kenjiro Murata",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 199,
  lastChapter: 695,
  characterClaims: "jsonl",
  aliasOf: "world-character/kenjiro-murata",
  createdAt: "2026-09-19T00:22:51.654Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
