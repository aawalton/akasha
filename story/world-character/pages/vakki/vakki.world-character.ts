import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vakki = {
  id: "01a0b70d-841b-749e-92c9-3b3706855c22",
  type: "page-type/world-character",
  slug: "vakki",
  title: "Vakki",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
