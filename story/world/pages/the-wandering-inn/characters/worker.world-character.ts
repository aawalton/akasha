import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const worker = {
  id: "01a0b70d-a069-79ab-8776-49fb91184ffa",
  type: "page-type/world-character",
  slug: "worker",
  title: "Worker",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 28,
  lastChapter: 352,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:18.697Z",
  updatedAt: "2026-09-22T13:09:57.000Z",
} as const satisfies WorldCharacter
