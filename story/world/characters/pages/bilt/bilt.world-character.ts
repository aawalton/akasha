import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bilt = {
  id: "01a0b707-84d5-7569-9497-fd759b4dcd01",
  type: "page-type/world-character",
  slug: "bilt",
  title: "Bilt",
  world: "world/the-wandering-inn",
  firstChapter: 525,
  lastChapter: 525,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
