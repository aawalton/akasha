import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hexore = {
  id: "01a0b70a-fb49-7d24-a112-c16db677a08f",
  type: "page-type/world-character",
  slug: "hexore",
  title: "Hexore",
  world: "world/the-wandering-inn",
  firstChapter: 795,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
