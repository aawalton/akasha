import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const makhir = {
  id: "01a0b70b-9953-75ff-8318-3273b855eaa2",
  type: "page-type/world-character",
  slug: "makhir",
  title: "Makhir",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 663,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
