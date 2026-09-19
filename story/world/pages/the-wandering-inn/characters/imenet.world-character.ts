import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const imenet = {
  id: "01a0b70b-0aa9-7528-879f-c4ec4cad78cb",
  type: "page-type/world-character",
  slug: "imenet",
  title: "Imenet",
  world: "world/the-wandering-inn",
  firstChapter: 212,
  lastChapter: 212,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
