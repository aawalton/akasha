import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gralton = {
  id: "01a0b70a-e7f3-7973-a86e-1e71756b8d16",
  type: "page-type/world-character",
  slug: "gralton",
  title: "Gralton",
  world: "world/the-wandering-inn",
  firstChapter: 296,
  lastChapter: 463,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
