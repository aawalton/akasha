import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ureca = {
  id: "01a0b70d-81de-741d-8519-188480326332",
  type: "page-type/world-character",
  slug: "ureca",
  title: "Ureca",
  world: "world/the-wandering-inn",
  firstChapter: 445,
  lastChapter: 445,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
