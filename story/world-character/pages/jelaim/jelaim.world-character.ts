import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jelaim = {
  id: "01a0b70b-1c77-7596-9a1e-fb06daa4e7d5",
  type: "page-type/world-character",
  slug: "jelaim",
  title: "Jelaim",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 324,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
