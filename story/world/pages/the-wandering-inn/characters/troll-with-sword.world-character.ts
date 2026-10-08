import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const trollWithSword = {
  id: "01a0b70d-7299-79cc-883e-bca2aedd3980",
  type: "page-type/world-character",
  slug: "troll-with-sword",
  title: "the Troll with the sword",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 723,
  lastChapter: 723,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:06.969Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
