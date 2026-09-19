import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gaills = {
  id: "01a0b70a-8f16-7c33-bfa4-1e476eea7d55",
  type: "page-type/world-character",
  slug: "gaills",
  title: "Gaills",
  world: "world/the-wandering-inn",
  firstChapter: 625,
  lastChapter: 625,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
