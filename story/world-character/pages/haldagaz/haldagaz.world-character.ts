import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const haldagaz = {
  id: "01a0b70a-ee57-7cb5-be51-79fa12e6f266",
  type: "page-type/world-character",
  slug: "haldagaz",
  title: "Haldagaz",
  world: "world/the-wandering-inn",
  firstChapter: 594,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
