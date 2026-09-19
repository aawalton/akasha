import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const galina = {
  id: "01a0b70a-8fbd-7802-9068-b78af1231ac4",
  type: "page-type/world-character",
  slug: "galina",
  title: "Galina",
  world: "world/the-wandering-inn",
  firstChapter: 109,
  lastChapter: 441,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
