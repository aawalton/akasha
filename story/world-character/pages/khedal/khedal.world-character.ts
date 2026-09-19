import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const khedal = {
  id: "01a0b70b-694d-73bf-bd41-d23dae927440",
  type: "page-type/world-character",
  slug: "khedal",
  title: "Prince Khedal",
  world: "world/the-wandering-inn",
  firstChapter: 594,
  lastChapter: 594,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
