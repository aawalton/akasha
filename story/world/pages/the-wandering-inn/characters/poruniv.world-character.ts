import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const poruniv = {
  id: "01a0b70c-71f6-7911-b59f-520526437e2f",
  type: "page-type/world-character",
  slug: "poruniv",
  title: "Poruniv",
  world: "world/the-wandering-inn",
  firstChapter: 538,
  lastChapter: 625,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
