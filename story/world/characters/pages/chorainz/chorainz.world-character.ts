import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const chorainz = {
  id: "01a0b709-ff78-74ef-8536-3d128b23ce76",
  type: "page-type/world-character",
  slug: "chorainz",
  title: "Chorainz",
  world: "world/the-wandering-inn",
  firstChapter: 824,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
