import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dekass = {
  id: "01a0b70a-148f-7ce6-b65e-de4462a4abb6",
  type: "page-type/world-character",
  slug: "dekass",
  title: "Dekass",
  world: "world/the-wandering-inn",
  firstChapter: 392,
  lastChapter: 562,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
