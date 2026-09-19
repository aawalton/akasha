import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theCombinedMind = {
  id: "01a0b70d-1bf2-7767-9dc2-c20fda7ce555",
  type: "page-type/world-character",
  slug: "the-combined-mind",
  title: "the Combined Mind",
  world: "world/the-wandering-inn",
  firstChapter: 618,
  lastChapter: 618,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
