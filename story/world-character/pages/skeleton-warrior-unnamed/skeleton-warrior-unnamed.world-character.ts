import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const skeletonWarriorUnnamed = {
  id: "01a0b70d-04ac-7e4d-8a1e-73c21d1e911f",
  type: "page-type/world-character",
  slug: "skeleton-warrior-unnamed",
  title: "the animated skeleton",
  world: "world/the-wandering-inn",
  firstChapter: 44,
  lastChapter: 44,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
