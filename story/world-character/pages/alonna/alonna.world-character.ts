import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alonna = {
  id: "01a0b707-6a5c-7da8-8145-8603acc54e61",
  type: "page-type/world-character",
  slug: "alonna",
  title: "Alonna",
  world: "world/the-wandering-inn",
  firstChapter: 365,
  lastChapter: 365,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
