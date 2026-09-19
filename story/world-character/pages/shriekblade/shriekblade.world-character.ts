import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shriekblade = {
  id: "01a0b70c-feff-7dec-8e39-2b53fd0f56ef",
  type: "page-type/world-character",
  slug: "shriekblade",
  title: "Shriekblade",
  world: "world/the-wandering-inn",
  firstChapter: 436,
  lastChapter: 537,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
