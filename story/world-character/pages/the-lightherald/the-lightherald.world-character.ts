import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theLightherald = {
  id: "01a0b70d-1ec0-79d4-b039-3e60f3fbb2a8",
  type: "page-type/world-character",
  slug: "the-lightherald",
  title: "the Lightherald",
  world: "world/the-wandering-inn",
  firstChapter: 568,
  lastChapter: 568,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
