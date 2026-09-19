import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const oswalt = {
  id: "01a0b70c-1e44-719b-8823-e76ccb8a4f45",
  type: "page-type/world-character",
  slug: "oswalt",
  title: "Oswalt",
  world: "world/the-wandering-inn",
  firstChapter: 252,
  lastChapter: 252,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
