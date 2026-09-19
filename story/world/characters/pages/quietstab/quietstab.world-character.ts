import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const quietstab = {
  id: "01a0b70c-7c24-7d85-8625-37f51a7a05b3",
  type: "page-type/world-character",
  slug: "quietstab",
  title: "Quietstab",
  world: "world/the-wandering-inn",
  firstChapter: 263,
  lastChapter: 295,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
