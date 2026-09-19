import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const quexa = {
  id: "01a0b70c-7be8-75c4-8d51-23ffcd7385a4",
  type: "page-type/world-character",
  slug: "quexa",
  title: "Quexa",
  world: "world/the-wandering-inn",
  firstChapter: 196,
  lastChapter: 317,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
