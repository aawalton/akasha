import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fetohepKing = {
  id: "01a0b70a-8395-79f0-b3cf-5ad0d6acdb63",
  type: "page-type/world-character",
  slug: "fetohep-king",
  title: "Fetohep",
  world: "world/the-wandering-inn",
  firstChapter: 808,
  lastChapter: 808,
  characterClaims: "jsonl",
  aliasOf: "world-character/fetohep",
} as const satisfies WorldCharacter
