import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const helm = {
  id: "01a0b70a-f8ad-7da5-8428-76c772539348",
  type: "page-type/world-character",
  slug: "helm",
  title: "Helm",
  world: "world/the-wandering-inn",
  firstChapter: 202,
  lastChapter: 203,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
