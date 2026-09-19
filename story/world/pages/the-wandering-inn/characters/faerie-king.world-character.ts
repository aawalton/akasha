import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const faerieKing = {
  id: "01a0b70a-794e-7570-bd89-09da32997fe8",
  type: "page-type/world-character",
  slug: "faerie-king",
  title: "Faerie King",
  world: "world/the-wandering-inn",
  firstChapter: 480,
  lastChapter: 724,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
