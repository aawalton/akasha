import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const heorth = {
  id: "01a0b70a-f8e1-7d91-94f9-73af04ed771a",
  type: "page-type/world-character",
  slug: "heorth",
  title: "Heorth",
  world: "world/the-wandering-inn",
  firstChapter: 606,
  lastChapter: 607,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
