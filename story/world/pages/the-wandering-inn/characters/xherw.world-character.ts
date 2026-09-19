import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xherw = {
  id: "01a0b70d-a3c5-750b-8554-a6916717baba",
  type: "page-type/world-character",
  slug: "xherw",
  title: "Xherw",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 586,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
