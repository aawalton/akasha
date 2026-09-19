import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const harpyQueen = {
  id: "01a0b70a-f0f9-7d60-9e0e-95ac20d677cd",
  type: "page-type/world-character",
  slug: "harpy-queen",
  title: "the Harpy Queen",
  world: "world/the-wandering-inn",
  firstChapter: 811,
  lastChapter: 811,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
