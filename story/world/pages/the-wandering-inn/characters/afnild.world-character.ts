import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const afnild = {
  id: "01a0b707-64db-7aa2-a8ff-3c8b9da972b8",
  type: "page-type/world-character",
  slug: "afnild",
  title: "Afnild",
  world: "world/the-wandering-inn",
  firstChapter: 591,
  lastChapter: 591,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
