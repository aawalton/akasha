import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulvaTerland = {
  id: "01a0b70d-7f0a-7a1c-8274-0ef7c9e003bb",
  type: "page-type/world-character",
  slug: "ulva-terland",
  title: "Ulva Terland",
  world: "world/the-wandering-inn",
  firstChapter: 474,
  lastChapter: 820,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
