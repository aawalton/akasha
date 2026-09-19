import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ophelia = {
  id: "01a0b70c-1993-7552-8887-537bde41115c",
  type: "page-type/world-character",
  slug: "ophelia",
  title: "Ophelia",
  world: "world/the-wandering-inn",
  firstChapter: 163,
  lastChapter: 164,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
