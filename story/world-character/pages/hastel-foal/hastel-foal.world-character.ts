import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hastelFoal = {
  id: "01a0b70a-f313-7d87-99f2-925d152a5b26",
  type: "page-type/world-character",
  slug: "hastel-foal",
  title: "Hastel's foal",
  world: "world/the-wandering-inn",
  firstChapter: 317,
  lastChapter: 317,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
