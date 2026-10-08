import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const erinInnkeeper = {
  id: "01a0b70a-7111-77e4-8001-187c5e303f93",
  type: "page-type/world-character",
  slug: "erin-innkeeper",
  title: "Erin (innkeeper)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 480,
  lastChapter: 480,
  characterClaims: "jsonl",
  aliasOf: "world-character/erin-solstice",
  createdAt: "2026-09-19T00:21:49.969Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
