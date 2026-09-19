import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const salkis = {
  id: "01a0b70c-ab3b-77c8-8bde-44d27ac1e033",
  type: "page-type/world-character",
  slug: "salkis",
  title: "Salkis",
  world: "world/the-wandering-inn",
  firstChapter: 458,
  lastChapter: 745,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
