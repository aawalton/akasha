import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ikl = {
  id: "01a0b70b-0751-7c53-b574-e15d2e98fd22",
  type: "page-type/world-character",
  slug: "ikl",
  title: "Ikl",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 520,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
