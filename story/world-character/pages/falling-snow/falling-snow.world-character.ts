import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fallingSnow = {
  id: "01a0b70a-7ad4-7a13-8d22-3c4f577fd8e0",
  type: "page-type/world-character",
  slug: "falling-snow",
  title: "Falling Snow",
  world: "world/the-wandering-inn",
  firstChapter: 347,
  lastChapter: 347,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
