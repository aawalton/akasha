import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maresar = {
  id: "01a0b70b-9a03-7b9f-a05c-5bc65d3749f0",
  type: "page-type/world-character",
  slug: "maresar",
  title: "Maresar",
  world: "world/the-wandering-inn",
  firstChapter: 179,
  lastChapter: 558,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
