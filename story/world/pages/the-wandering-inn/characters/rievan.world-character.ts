import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rievan = {
  id: "01a0b70c-988d-7a60-b7d5-e246d42eab52",
  type: "page-type/world-character",
  slug: "rievan",
  title: "Rievan Forstrom",
  world: "world/the-wandering-inn",
  firstChapter: 159,
  lastChapter: 161,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
