import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const karsaeuDequoa = {
  id: "01a0b70b-2373-76e1-b7e0-ae670ce51a44",
  type: "page-type/world-character",
  slug: "karsaeu-dequoa",
  title: "Karsaeu-Dequoa",
  world: "world/the-wandering-inn",
  firstChapter: 443,
  lastChapter: 443,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
