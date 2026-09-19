import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const garen = {
  id: "01a0b70a-90d1-70ea-966b-2b8edd749888",
  type: "page-type/world-character",
  slug: "garen",
  title: "Garen",
  world: "world/the-wandering-inn",
  firstChapter: 99,
  lastChapter: 308,
  characterClaims: "jsonl",
  aliasOf: "world-character/garen-redfang",
} as const satisfies WorldCharacter
