import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const designatedWorker = {
  id: "01a0b70a-1874-7a44-9d44-85c8740eeeb1",
  type: "page-type/world-character",
  slug: "designated-worker",
  title: "the Designated Worker",
  world: "world/the-wandering-inn",
  firstChapter: 32,
  lastChapter: 32,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
