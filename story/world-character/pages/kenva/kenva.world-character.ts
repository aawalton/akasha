import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kenva = {
  id: "01a0b70b-6732-71e5-a7f9-06d82554e63b",
  type: "page-type/world-character",
  slug: "kenva",
  title: "Kenva",
  world: "world/the-wandering-inn",
  firstChapter: 641,
  lastChapter: 641,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
