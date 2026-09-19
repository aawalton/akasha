import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const antherr = {
  id: "01a0b707-6eeb-7432-8d99-6050f9da9870",
  type: "page-type/world-character",
  slug: "antherr",
  title: "Antherr Twotwentyonethree Herodotus",
  world: "world/the-wandering-inn",
  firstChapter: 616,
  lastChapter: 747,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
