import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const prildor = {
  id: "01a0b70c-7346-7c7e-a26a-40af7d8af2d8",
  type: "page-type/world-character",
  slug: "prildor",
  title: "Prildor",
  world: "world/the-wandering-inn",
  firstChapter: 709,
  lastChapter: 774,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
