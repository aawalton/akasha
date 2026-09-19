import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const itreimedes = {
  id: "01a0b70b-1653-7c3f-a33a-122fced6605c",
  type: "page-type/world-character",
  slug: "itreimedes",
  title: "Itreimedes",
  world: "world/the-wandering-inn",
  firstChapter: 583,
  lastChapter: 583,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
