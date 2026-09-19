import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const graltonRadivaek = {
  id: "01a0b70a-e860-7911-8703-faed67b5d6b0",
  type: "page-type/world-character",
  slug: "gralton-radivaek",
  title: "Lord Gralton Radivaek",
  world: "world/the-wandering-inn",
  firstChapter: 346,
  lastChapter: 519,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
