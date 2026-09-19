import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tolveilouka = {
  id: "01a0b70d-698d-7cd7-8746-b6226e5ffc33",
  type: "page-type/world-character",
  slug: "tolveilouka",
  title: "Tolveilouka Ve'delina Mer",
  world: "world/the-wandering-inn",
  firstChapter: 531,
  lastChapter: 764,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
