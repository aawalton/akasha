import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const flora = {
  id: "01a0b70a-8a0a-731a-9afe-c0daf894bd8b",
  type: "page-type/world-character",
  slug: "flora",
  title: "Flora",
  world: "world/the-wandering-inn",
  firstChapter: 439,
  lastChapter: 657,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
