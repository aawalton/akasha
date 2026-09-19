import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vaulont = {
  id: "01a0b70d-8942-75be-903e-c04c6974322b",
  type: "page-type/world-character",
  slug: "vaulont",
  title: "Vaulont the Ash",
  world: "world/the-wandering-inn",
  firstChapter: 498,
  lastChapter: 780,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
