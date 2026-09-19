import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const heish = {
  id: "01a0b70a-f794-7f4e-b0ef-1a4a4d023d56",
  type: "page-type/world-character",
  slug: "heish",
  title: "Guidance Heish",
  world: "world/the-wandering-inn",
  firstChapter: 575,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
