import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nervhetti = {
  id: "01a0b70c-0846-7393-ab1d-8bdbcfc28b1a",
  type: "page-type/world-character",
  slug: "nervhetti",
  title: "Nervhetti",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 454,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
