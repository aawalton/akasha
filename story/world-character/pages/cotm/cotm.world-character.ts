import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cotm = {
  id: "01a0b70a-0925-7da2-8c47-0cdd2263a150",
  type: "page-type/world-character",
  slug: "cotm",
  title: "Cotm",
  world: "world/the-wandering-inn",
  firstChapter: 575,
  lastChapter: 575,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
