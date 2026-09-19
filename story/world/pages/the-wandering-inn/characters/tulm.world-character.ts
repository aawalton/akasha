import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tulm = {
  id: "01a0b70d-743e-7453-9679-e762bf61d3bf",
  type: "page-type/world-character",
  slug: "tulm",
  title: "Tulm the Mithril",
  world: "world/the-wandering-inn",
  firstChapter: 335,
  lastChapter: 335,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
