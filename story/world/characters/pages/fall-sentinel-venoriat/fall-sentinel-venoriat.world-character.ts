import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fallSentinelVenoriat = {
  id: "01a0b70a-7a64-7c01-b36d-489b04ff0837",
  type: "page-type/world-character",
  slug: "fall-sentinel-venoriat",
  title: "Fall's Sentinel",
  world: "world/the-wandering-inn",
  firstChapter: 490,
  lastChapter: 490,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
