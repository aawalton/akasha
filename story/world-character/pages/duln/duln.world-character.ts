import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const duln = {
  id: "01a0b70a-1fa3-799e-a334-b270480edda8",
  type: "page-type/world-character",
  slug: "duln",
  title: "Duln",
  world: "world/the-wandering-inn",
  firstChapter: 675,
  lastChapter: 675,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
