import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const masterEngineerKevin = {
  id: "01a0b759-fec0-713e-b9b8-4525c0c0a324",
  type: "page-type/world-character",
  slug: "master-engineer-kevin",
  title: "Master Engineer Kevin",
  world: "world/the-wandering-inn",
  firstChapter: 756,
  lastChapter: 756,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
