import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thomastVeniral = {
  id: "01a0b70d-6324-768a-bf50-0088502706c1",
  type: "page-type/world-character",
  slug: "thomast-veniral",
  title: "Thomast Veniral",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
