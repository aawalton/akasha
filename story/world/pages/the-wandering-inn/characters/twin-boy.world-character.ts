import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twinBoy = {
  id: "01a0b70d-7681-78c8-baa2-c5e81df73d65",
  type: "page-type/world-character",
  slug: "twin-boy",
  title: "a boy of sixteen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 27,
  lastChapter: 27,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:07.969Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
