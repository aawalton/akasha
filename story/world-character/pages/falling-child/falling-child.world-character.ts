import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fallingChild = {
  id: "01a0b70a-7a9c-7aca-a2a8-273f76b85d56",
  type: "page-type/world-character",
  slug: "falling-child",
  title: "a falling child",
  world: "world/the-wandering-inn",
  firstChapter: 723,
  lastChapter: 723,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
