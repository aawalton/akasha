import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const goldenBloom = {
  id: "01a0b70a-e5dd-71e5-8e6a-0b334e07ddc4",
  type: "page-type/world-character",
  slug: "golden-bloom",
  title: "Golden Bloom",
  world: "world/the-wandering-inn",
  firstChapter: 805,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
