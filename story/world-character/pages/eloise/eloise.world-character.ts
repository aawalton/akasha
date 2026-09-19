import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eloise = {
  id: "01a0b70a-6651-7a56-8648-e642d431da46",
  type: "page-type/world-character",
  slug: "eloise",
  title: "Eloise",
  world: "world/the-wandering-inn",
  firstChapter: 351,
  lastChapter: 463,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
