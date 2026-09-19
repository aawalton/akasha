import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ricuvTerland = {
  id: "01a0b70c-97a0-7a0c-a920-84235e114745",
  type: "page-type/world-character",
  slug: "ricuv-terland",
  title: "Ricuv Terland",
  world: "world/the-wandering-inn",
  firstChapter: 568,
  lastChapter: 568,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
