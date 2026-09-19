import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const noiraid = {
  id: "01a0b70c-0ab9-77d4-b65d-e765e5c68aa8",
  type: "page-type/world-character",
  slug: "noiraid",
  title: "Noiraid",
  world: "world/the-wandering-inn",
  firstChapter: 779,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
