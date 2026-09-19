import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vetn = {
  id: "01a0b70d-9296-76e1-bb48-a8a767dc8fcd",
  type: "page-type/world-character",
  slug: "vetn",
  title: "Vetn",
  world: "world/the-wandering-inn",
  firstChapter: 530,
  lastChapter: 678,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
