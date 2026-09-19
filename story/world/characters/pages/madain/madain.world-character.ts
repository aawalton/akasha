import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const madain = {
  id: "01a0b70b-955e-7f69-bae6-1c26e00e5c76",
  type: "page-type/world-character",
  slug: "madain",
  title: "Madain",
  world: "world/the-wandering-inn",
  firstChapter: 336,
  lastChapter: 336,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
