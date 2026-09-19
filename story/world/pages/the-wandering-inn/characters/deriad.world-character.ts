import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const deriad = {
  id: "01a0b70a-183f-7401-b89d-3dff2552ea47",
  type: "page-type/world-character",
  slug: "deriad",
  title: "Deriad",
  world: "world/the-wandering-inn",
  firstChapter: 668,
  lastChapter: 668,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
