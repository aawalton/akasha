import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const clara = {
  id: "01a0b70a-02f8-7f06-9808-063dab336d21",
  type: "page-type/world-character",
  slug: "clara",
  title: "Clara",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 130,
  lastChapter: 131,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:21.784Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
