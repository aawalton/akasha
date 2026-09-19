import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const visma = {
  id: "01a0b70d-9568-777e-865f-12ca519a5cfb",
  type: "page-type/world-character",
  slug: "visma",
  title: "Visma",
  world: "world/the-wandering-inn",
  firstChapter: 405,
  lastChapter: 751,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
