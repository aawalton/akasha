import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dulfe = {
  id: "01a0b70a-1f38-70fb-b551-9327346bcad5",
  type: "page-type/world-character",
  slug: "dulfe",
  title: "Dulfe",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 326,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
