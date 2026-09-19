import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sylind = {
  id: "01a0b70d-110e-72f2-8700-b80745d3f848",
  type: "page-type/world-character",
  slug: "sylind",
  title: "Sylind",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
