import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ytol = {
  id: "01a0b70d-e2ae-7ff2-8396-1c2a57dfae0f",
  type: "page-type/world-character",
  slug: "ytol",
  title: "Ytol",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 454,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
