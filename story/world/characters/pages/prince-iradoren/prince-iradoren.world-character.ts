import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const princeIradoren = {
  id: "01a0b70c-73b3-70e2-8499-1f0403bfb541",
  type: "page-type/world-character",
  slug: "prince-iradoren",
  title: "Prince Iradoren",
  world: "world/the-wandering-inn",
  firstChapter: 687,
  lastChapter: 687,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
