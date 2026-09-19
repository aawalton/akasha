import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hedault = {
  id: "01a0b70a-f725-7dc0-a380-7a6f67a6844f",
  type: "page-type/world-character",
  slug: "hedault",
  title: "Hedault",
  world: "world/the-wandering-inn",
  firstChapter: 169,
  lastChapter: 693,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
