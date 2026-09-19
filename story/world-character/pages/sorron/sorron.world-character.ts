import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sorron = {
  id: "01a0b70d-0a78-7c92-92cd-d450fe32e3de",
  type: "page-type/world-character",
  slug: "sorron",
  title: "Sorron",
  world: "world/the-wandering-inn",
  firstChapter: 636,
  lastChapter: 636,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
