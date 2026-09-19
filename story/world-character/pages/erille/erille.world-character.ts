import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const erille = {
  id: "01a0b70a-6f34-7e27-b7ed-16cb8ec98ace",
  type: "page-type/world-character",
  slug: "erille",
  title: "Erille",
  world: "world/the-wandering-inn",
  firstChapter: 217,
  lastChapter: 218,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
