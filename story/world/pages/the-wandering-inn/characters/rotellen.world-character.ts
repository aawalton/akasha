import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rotellen = {
  id: "01a0b70c-9fbd-71f9-a835-2b7f03fa6898",
  type: "page-type/world-character",
  slug: "rotellen",
  title: "Rotellen",
  world: "world/the-wandering-inn",
  firstChapter: 784,
  lastChapter: 784,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
