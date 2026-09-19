import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lessha = {
  id: "01a0b70b-81a4-7844-a40c-15f4c4403335",
  type: "page-type/world-character",
  slug: "lessha",
  title: "Lessha",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 806,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
