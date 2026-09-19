import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const smallGoblin = {
  id: "01a0b70d-05cd-7ec0-97ea-155f96721c39",
  type: "page-type/world-character",
  slug: "small-goblin",
  title: "the smallest Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 8,
  lastChapter: 8,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
