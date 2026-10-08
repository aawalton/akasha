import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mirin = {
  id: "01a0b70b-ef37-7437-a0fc-ca51353b75f1",
  type: "page-type/world-character",
  slug: "mirin",
  title: "Mirin",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 324,
  lastChapter: 410,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:27.799Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
