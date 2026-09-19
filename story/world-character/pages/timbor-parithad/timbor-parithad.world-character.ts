import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const timborParithad = {
  id: "01a0b70d-64ae-72a8-bfe2-e5b4b4c34c4e",
  type: "page-type/world-character",
  slug: "timbor-parithad",
  title: "Timbor Parithad",
  world: "world/the-wandering-inn",
  firstChapter: 200,
  lastChapter: 200,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
