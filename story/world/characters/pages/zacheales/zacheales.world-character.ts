import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zacheales = {
  id: "01a0b70d-e526-7b69-8e90-6352ab8d92a9",
  type: "page-type/world-character",
  slug: "zacheales",
  title: "Zacheales",
  world: "world/the-wandering-inn",
  firstChapter: 667,
  lastChapter: 667,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
