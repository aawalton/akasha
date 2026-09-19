import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gaile = {
  id: "01a0b70a-8edd-7317-993c-eb8f2e425783",
  type: "page-type/world-character",
  slug: "gaile",
  title: "Gaile",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
