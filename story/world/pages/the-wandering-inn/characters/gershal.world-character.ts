import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gershal = {
  id: "01a0b70a-9c73-7c56-aa90-38c40a16bfbe",
  type: "page-type/world-character",
  slug: "gershal",
  title: "Gershal",
  world: "world/the-wandering-inn",
  firstChapter: 233,
  lastChapter: 688,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
