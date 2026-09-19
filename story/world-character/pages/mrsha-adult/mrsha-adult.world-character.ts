import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mrshaAdult = {
  id: "01a0b70b-fa73-7983-af45-1df20072ad60",
  type: "page-type/world-character",
  slug: "mrsha-adult",
  title: "Arrema",
  world: "world/the-wandering-inn",
  firstChapter: 748,
  lastChapter: 748,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
