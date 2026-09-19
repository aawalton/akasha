import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maefDjinni = {
  id: "01a0b70b-95cd-7dab-afa2-55524f5add88",
  type: "page-type/world-character",
  slug: "maef-djinni",
  title: "Maef",
  world: "world/the-wandering-inn",
  firstChapter: 694,
  lastChapter: 694,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
