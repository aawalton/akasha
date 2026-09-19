import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const raekea = {
  id: "01a0b70c-7f88-7ddb-b3c6-6cf005075a9e",
  type: "page-type/world-character",
  slug: "raekea",
  title: "Raekea",
  world: "world/the-wandering-inn",
  firstChapter: 300,
  lastChapter: 655,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
