import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cassiedre = {
  id: "01a0b709-f539-7c9c-bb56-018dc82d493a",
  type: "page-type/world-character",
  slug: "cassiedre",
  title: "Cassiedre",
  world: "world/the-wandering-inn",
  firstChapter: 735,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
