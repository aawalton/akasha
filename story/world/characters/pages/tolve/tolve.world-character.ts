import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tolve = {
  id: "01a0b70d-6956-727e-a86e-1eb1d5cfedbd",
  type: "page-type/world-character",
  slug: "tolve",
  title: "Tolveilouka Ve'delina Mer (Tolve)",
  world: "world/the-wandering-inn",
  firstChapter: 600,
  lastChapter: 600,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
