import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nemor = {
  id: "01a0b70c-04f3-73a6-834b-faecc8200562",
  type: "page-type/world-character",
  slug: "nemor",
  title: "Nemor",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 139,
  lastChapter: 140,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:33.363Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
