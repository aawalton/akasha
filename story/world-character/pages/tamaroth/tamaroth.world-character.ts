import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tamaroth = {
  id: "01a0b70d-1337-7e8d-8543-24927d85cdba",
  type: "page-type/world-character",
  slug: "tamaroth",
  title: "Tamaroth",
  world: "world/the-wandering-inn",
  firstChapter: 176,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
