import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gaziPathseeker = {
  id: "01a0b70a-9478-7351-acf3-37330f8da75b",
  type: "page-type/world-character",
  slug: "gazi-pathseeker",
  title: "Gazi Pathseeker",
  world: "world/the-wandering-inn",
  firstChapter: 41,
  lastChapter: 559,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
