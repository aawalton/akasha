import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cessic = {
  id: "01a0b709-fc1f-7e26-a733-528c3f4a72a9",
  type: "page-type/world-character",
  slug: "cessic",
  title: "Cessic",
  world: "world/the-wandering-inn",
  firstChapter: 159,
  lastChapter: 159,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
