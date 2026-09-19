import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gunpi = {
  id: "01a0b70a-edd5-74c6-b303-b84a9e4891dd",
  type: "page-type/world-character",
  slug: "gunpi",
  title: "Grumpy Gunpi",
  world: "world/the-wandering-inn",
  firstChapter: 792,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
