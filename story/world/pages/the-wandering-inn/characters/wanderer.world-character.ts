import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wanderer = {
  id: "01a0b70d-9912-715f-ad06-5286f94d2343",
  type: "page-type/world-character",
  slug: "wanderer",
  title: "Wanderer",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 516,
  lastChapter: 530,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:16.818Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
