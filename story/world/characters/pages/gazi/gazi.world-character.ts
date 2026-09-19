import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gazi = {
  id: "01a0b70a-9409-7829-ba58-71ebf56a5f3f",
  type: "page-type/world-character",
  slug: "gazi",
  title: "Gazi",
  world: "world/the-wandering-inn",
  firstChapter: 39,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
