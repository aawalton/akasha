import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordRaithland = {
  id: "01a0b70b-8b39-7fb5-a2a5-0ce556b178a1",
  type: "page-type/world-character",
  slug: "lord-raithland",
  title: "Lord Mireden Moore of House Raithland",
  world: "world/the-wandering-inn",
  firstChapter: 762,
  lastChapter: 762,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
