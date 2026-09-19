import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merila = {
  id: "01a0b70b-e8bb-7be1-aa59-defa67784a79",
  type: "page-type/world-character",
  slug: "merila",
  title: "Merila",
  world: "world/the-wandering-inn",
  firstChapter: 527,
  lastChapter: 573,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
