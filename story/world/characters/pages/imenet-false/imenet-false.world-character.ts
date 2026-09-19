import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const imenetFalse = {
  id: "01a0b70b-0adf-77e2-9579-1df086dfacca",
  type: "page-type/world-character",
  slug: "imenet-false",
  title: "skeleton mage in disguise",
  world: "world/the-wandering-inn",
  firstChapter: 211,
  lastChapter: 211,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
