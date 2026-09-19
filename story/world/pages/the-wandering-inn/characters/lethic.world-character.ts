import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lethic = {
  id: "01a0b70b-81dd-707c-9291-30f770625eac",
  type: "page-type/world-character",
  slug: "lethic",
  title: "Lethic",
  world: "world/the-wandering-inn",
  firstChapter: 196,
  lastChapter: 196,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
