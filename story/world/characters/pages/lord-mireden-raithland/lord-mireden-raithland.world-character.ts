import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordMiredenRaithland = {
  id: "01a0b70b-8a08-7fee-8fa4-27fa1360fe33",
  type: "page-type/world-character",
  slug: "lord-mireden-raithland",
  title: "Lord Mireden Raithland",
  world: "world/the-wandering-inn",
  firstChapter: 784,
  lastChapter: 784,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
