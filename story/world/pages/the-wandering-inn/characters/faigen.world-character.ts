import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const faigen = {
  id: "01a0b70a-7982-7488-9f77-e299aaabe20f",
  type: "page-type/world-character",
  slug: "faigen",
  title: "Faigen",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
