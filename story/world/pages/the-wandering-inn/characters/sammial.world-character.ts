import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sammial = {
  id: "01a0b70c-ac23-7ff8-b3fc-220f7c25b33c",
  type: "page-type/world-character",
  slug: "sammial",
  title: "Sammial",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 527,
  lastChapter: 656,
  characterClaims: "jsonl",
  aliasOf: "world-character/sammial-veltras",
  createdAt: "2026-09-19T00:24:16.163Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
