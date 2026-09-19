import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theGeomancer = {
  id: "01a0b70d-1d5b-7349-a984-9d894547ce8d",
  type: "page-type/world-character",
  slug: "the-geomancer",
  title: "the mage in yellow robes",
  world: "world/the-wandering-inn",
  firstChapter: 182,
  lastChapter: 182,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
