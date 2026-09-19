import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xitegenTerland = {
  id: "01a0b70d-d793-78aa-be7f-06a9d3f20080",
  type: "page-type/world-character",
  slug: "xitegen-terland",
  title: "Xitegen Terland",
  world: "world/the-wandering-inn",
  firstChapter: 748,
  lastChapter: 748,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
