import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thePyromancer = {
  id: "01a0b70d-2099-78d7-a1af-36b82fb10e25",
  type: "page-type/world-character",
  slug: "the-pyromancer",
  title: "The Pyromancer",
  world: "world/the-wandering-inn",
  firstChapter: 355,
  lastChapter: 355,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
