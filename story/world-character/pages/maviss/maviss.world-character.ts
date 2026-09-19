import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const maviss = {
  id: "01a0b70b-e339-725e-b168-f031d029d2e2",
  type: "page-type/world-character",
  slug: "maviss",
  title: "Maviss",
  world: "world/the-wandering-inn",
  firstChapter: 327,
  lastChapter: 328,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
