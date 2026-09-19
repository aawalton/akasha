import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const merlin = {
  id: "01a0b70b-e9db-79fe-9d5f-cc813c15d985",
  type: "page-type/world-character",
  slug: "merlin",
  title: "Merlin",
  world: "world/the-wandering-inn",
  firstChapter: 480,
  lastChapter: 480,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
