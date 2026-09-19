import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const donbaaar = {
  id: "01a0b70a-1ae2-7dbd-9acf-07a869ad0c3f",
  type: "page-type/world-character",
  slug: "donbaaar",
  title: "Donbaaar",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 523,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
