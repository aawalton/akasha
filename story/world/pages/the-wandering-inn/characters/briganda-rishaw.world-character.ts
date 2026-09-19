import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const brigandaRishaw = {
  id: "01a0b707-8a24-7f2c-ab4c-12c39729e6a7",
  type: "page-type/world-character",
  slug: "briganda-rishaw",
  title: "Briganda Rishaw",
  world: "world/the-wandering-inn",
  firstChapter: 446,
  lastChapter: 446,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
