import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thompsonGreen = {
  id: "01a0b70d-6360-729b-a790-b0aefd892041",
  type: "page-type/world-character",
  slug: "thompson-green",
  title: "Thompson Green",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
