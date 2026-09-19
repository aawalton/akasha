import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const charlay = {
  id: "01a0b709-fd20-71e2-9973-ef639092c393",
  type: "page-type/world-character",
  slug: "charlay",
  title: "Charlay",
  world: "world/the-wandering-inn",
  firstChapter: 346,
  lastChapter: 363,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
