import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const viceria = {
  id: "01a0b70d-934e-7ed6-8bd8-d025abd4009d",
  type: "page-type/world-character",
  slug: "viceria",
  title: "Viceria",
  world: "world/the-wandering-inn",
  firstChapter: 194,
  lastChapter: 408,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
