import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const inkar = {
  id: "01a0b70b-0cce-7887-94c9-6cdda9920d14",
  type: "page-type/world-character",
  slug: "inkar",
  title: "Inkar the Traveller",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  firstChapter: 470,
  lastChapter: 711,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:29.838Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
