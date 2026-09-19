import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const serYoriven = {
  id: "01a0b70c-f4a9-7e30-9bf4-12b4515b3402",
  type: "page-type/world-character",
  slug: "ser-yoriven",
  title: "Ser Yoriven",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 533,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
