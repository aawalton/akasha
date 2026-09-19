import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const solwes = {
  id: "01a0b70d-0928-7b55-a45f-c4ec3be416c4",
  type: "page-type/world-character",
  slug: "solwes",
  title: "Solwes",
  world: "world/the-wandering-inn",
  firstChapter: 677,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
