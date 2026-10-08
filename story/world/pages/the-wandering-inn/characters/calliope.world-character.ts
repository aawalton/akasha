import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const calliope = {
  id: "01a0b707-9052-7b9e-9557-9cfe533f018b",
  type: "page-type/world-character",
  slug: "calliope",
  title: "Calliope",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 181,
  lastChapter: 323,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:41.362Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
