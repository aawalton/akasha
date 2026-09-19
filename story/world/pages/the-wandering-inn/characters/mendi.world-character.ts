import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mendi = {
  id: "01a0b70b-e5ee-79db-97ea-149dabd6ced2",
  type: "page-type/world-character",
  slug: "mendi",
  title: "Mendi",
  world: "world/the-wandering-inn",
  firstChapter: 402,
  lastChapter: 445,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
