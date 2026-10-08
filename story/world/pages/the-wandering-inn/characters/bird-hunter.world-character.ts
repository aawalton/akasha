import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const birdHunter = {
  id: "01a0b707-8601-72bd-87fd-bfca028aafa3",
  type: "page-type/world-character",
  slug: "bird-hunter",
  title: "Bird",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 434,
  lastChapter: 434,
  characterClaims: "jsonl",
  aliasOf: "world-character/bird",
  createdAt: "2026-09-19T00:18:38.721Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
