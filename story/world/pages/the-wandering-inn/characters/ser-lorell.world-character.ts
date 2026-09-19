import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serLorell = {
  id: "01a0b70c-f398-7360-9841-4bfeea23571e",
  type: "page-type/world-character",
  slug: "ser-lorell",
  title: "Ser Lorell",
  world: "world/the-wandering-inn",
  firstChapter: 378,
  lastChapter: 378,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
