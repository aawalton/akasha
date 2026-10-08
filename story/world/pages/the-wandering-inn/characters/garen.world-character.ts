import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const garen = {
  id: "01a0b70a-90d1-70ea-966b-2b8edd749888",
  type: "page-type/world-character",
  slug: "garen",
  title: "Garen",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 99,
  lastChapter: 308,
  characterClaims: "jsonl",
  aliasOf: "world-character/garen-redfang",
  createdAt: "2026-09-19T00:21:58.097Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
