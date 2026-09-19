import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const goeln = {
  id: "01a0b70a-e502-7698-b860-db551392e0bd",
  type: "page-type/world-character",
  slug: "goeln",
  title: "Goeln",
  world: "world/the-wandering-inn",
  firstChapter: 40,
  lastChapter: 40,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
