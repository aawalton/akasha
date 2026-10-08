import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beatica = {
  id: "01a0b707-7e66-76be-98eb-d9e6879a2b45",
  type: "page-type/world-character",
  slug: "beatica",
  title: "Beatica",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 350,
  lastChapter: 350,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.774Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
