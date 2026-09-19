import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shedrkh = {
  id: "01a0b70c-fc2e-74b2-aa73-c1daa03c2ef4",
  type: "page-type/world-character",
  slug: "shedrkh",
  title: "Shedrkh",
  world: "world/the-wandering-inn",
  firstChapter: 660,
  lastChapter: 660,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
