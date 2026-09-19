import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lykesa = {
  id: "01a0b70b-911f-77a3-abfe-47c6778a68d2",
  type: "page-type/world-character",
  slug: "lykesa",
  title: "Lykesa",
  world: "world/the-wandering-inn",
  firstChapter: 400,
  lastChapter: 400,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
