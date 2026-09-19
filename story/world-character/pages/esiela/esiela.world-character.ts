import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const esiela = {
  id: "01a0b70a-73d5-71ee-ad1a-7465f36c22e5",
  type: "page-type/world-character",
  slug: "esiela",
  title: "Esiela",
  world: "world/the-wandering-inn",
  firstChapter: 428,
  lastChapter: 454,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
