import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const aiko = {
  id: "01a0b707-6628-772d-b4d6-fa72f582402f",
  type: "page-type/world-character",
  slug: "aiko",
  title: "Aiko",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 196,
  lastChapter: 317,
  characterClaims: "jsonl",
  aliasOf: "world-character/aiko-nonomura",
  createdAt: "2026-09-19T00:18:30.568Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
