import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tisslVenleather = {
  id: "01a0b70d-6552-7d49-8ee0-811b50d87fde",
  type: "page-type/world-character",
  slug: "tissl-venleather",
  title: "Tissl Venleather",
  world: "world/the-wandering-inn",
  firstChapter: 787,
  lastChapter: 787,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
