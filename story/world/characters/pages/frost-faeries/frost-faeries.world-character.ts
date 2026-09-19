import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const frostFaeries = {
  id: "01a0b70a-8d8f-7598-bde8-ba5e64a7299f",
  type: "page-type/world-character",
  slug: "frost-faeries",
  title: "Frost Faeries",
  world: "world/the-wandering-inn",
  firstChapter: 100,
  lastChapter: 137,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
