import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nailihuaile = {
  id: "01a0b70b-fbfb-731d-85da-d484472c5b6b",
  type: "page-type/world-character",
  slug: "nailihuaile",
  title: "Nailihuaile",
  world: "world/the-wandering-inn",
  firstChapter: 377,
  lastChapter: 558,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
