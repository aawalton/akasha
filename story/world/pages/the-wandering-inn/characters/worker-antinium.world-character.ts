import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const workerAntinium = {
  id: "01a0b70d-a0a1-7baa-bb78-41fb2821642a",
  type: "page-type/world-character",
  slug: "worker-antinium",
  title: "Antinium Worker",
  world: "world/the-wandering-inn",
  firstChapter: 25,
  lastChapter: 25,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
