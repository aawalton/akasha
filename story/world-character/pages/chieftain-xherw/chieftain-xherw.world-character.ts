import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chieftainXherw = {
  id: "01a0b709-ff0f-7156-9f65-044ad8d6aebd",
  type: "page-type/world-character",
  slug: "chieftain-xherw",
  title: "Chieftain Xherw",
  world: "world/the-wandering-inn",
  firstChapter: 529,
  lastChapter: 529,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
