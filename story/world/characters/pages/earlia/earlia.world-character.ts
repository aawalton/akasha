import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const earlia = {
  id: "01a0b70a-223b-755e-9f32-6c5e318d74b7",
  type: "page-type/world-character",
  slug: "earlia",
  title: "Earlia",
  world: "world/the-wandering-inn",
  firstChapter: 268,
  lastChapter: 708,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
