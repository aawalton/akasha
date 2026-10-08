import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wailant = {
  id: "01a0b70d-9867-7164-88ea-a298d95c06c2",
  type: "page-type/world-character",
  slug: "wailant",
  title: "Wailant",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 405,
  lastChapter: 408,
  characterClaims: "jsonl",
  aliasOf: "world-character/wailant-strongheart",
  createdAt: "2026-09-19T00:25:16.647Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
