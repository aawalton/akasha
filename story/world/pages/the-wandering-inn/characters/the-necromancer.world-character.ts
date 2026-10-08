import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theNecromancer = {
  id: "01a0b70d-1f70-75bc-80ff-0146a9db2bbc",
  type: "page-type/world-character",
  slug: "the-necromancer",
  title: "the Necromancer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 193,
  lastChapter: 193,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:45.680Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
