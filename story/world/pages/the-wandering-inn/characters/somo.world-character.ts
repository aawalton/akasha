import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const somo = {
  id: "01a0b70d-0960-7a49-88bc-5e2c466fe96d",
  type: "page-type/world-character",
  slug: "somo",
  title: "Somo",
  world: "world/the-wandering-inn",
  firstChapter: 723,
  lastChapter: 729,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
