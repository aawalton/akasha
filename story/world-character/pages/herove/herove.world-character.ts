import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const herove = {
  id: "01a0b70a-f97e-7356-96f6-8925f7593d8b",
  type: "page-type/world-character",
  slug: "herove",
  title: "Herove Canidus",
  world: "world/the-wandering-inn",
  firstChapter: 601,
  lastChapter: 601,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
