import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const melidore = {
  id: "01a0b70b-e4cc-7105-adcf-ca8b093a9c01",
  type: "page-type/world-character",
  slug: "melidore",
  title: "Melidore",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  firstChapter: 475,
  lastChapter: 724,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:25.132Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
