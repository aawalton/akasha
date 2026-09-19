import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ci = {
  id: "01a0b70a-0047-73e7-992e-bca7c27eeb32",
  type: "page-type/world-character",
  slug: "ci",
  title: "Ci",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 468,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
