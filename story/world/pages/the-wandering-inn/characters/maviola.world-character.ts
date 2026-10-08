import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maviola = {
  id: "01a0b70b-dfe0-7224-831f-141a5245440b",
  type: "page-type/world-character",
  slug: "maviola",
  title: "Maviola",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 419,
  lastChapter: 770,
  characterClaims: "jsonl",
  aliasOf: "world-character/maviola-el",
  createdAt: "2026-09-19T00:23:23.872Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
