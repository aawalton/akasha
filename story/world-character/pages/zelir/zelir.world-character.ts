import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zelir = {
  id: "01a0b70d-eaa1-77fe-acd9-7ac9b951417f",
  type: "page-type/world-character",
  slug: "zelir",
  title: "Master Zelir",
  world: "world/the-wandering-inn",
  firstChapter: 489,
  lastChapter: 489,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
