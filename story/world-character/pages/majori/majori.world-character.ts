import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const majori = {
  id: "01a0b70b-991a-742a-a361-48a1976adcc4",
  type: "page-type/world-character",
  slug: "majori",
  title: "Majori",
  world: "world/the-wandering-inn",
  firstChapter: 770,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
