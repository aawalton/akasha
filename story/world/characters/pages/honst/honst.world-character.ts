import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const honst = {
  id: "01a0b70b-000e-7b47-bb29-ada548fe4275",
  type: "page-type/world-character",
  slug: "honst",
  title: "Honst",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
