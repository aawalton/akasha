import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const keeperUlree = {
  id: "01a0b70b-60e5-7a8f-a034-08f4a7d93c89",
  type: "page-type/world-character",
  slug: "keeper-ulree",
  title: "Keeper Ulree",
  world: "world/the-wandering-inn",
  firstChapter: 399,
  lastChapter: 399,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
