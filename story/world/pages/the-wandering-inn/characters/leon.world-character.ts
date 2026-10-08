import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const leon = {
  id: "01a0b70b-816b-7563-9e05-666b018a3bfa",
  type: "page-type/world-character",
  slug: "leon",
  title: "Leon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 109,
  lastChapter: 775,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:59.691Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
