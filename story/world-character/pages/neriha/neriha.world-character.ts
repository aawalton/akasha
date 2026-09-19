import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const neriha = {
  id: "01a0b70c-0566-7d76-842d-8bb7144b1318",
  type: "page-type/world-character",
  slug: "neriha",
  title: "Neriha",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 454,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
