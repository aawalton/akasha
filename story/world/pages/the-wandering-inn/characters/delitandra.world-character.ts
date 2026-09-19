import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const delitandra = {
  id: "01a0b70a-1624-73a8-9f66-acdb72d92818",
  type: "page-type/world-character",
  slug: "delitandra",
  title: "Delitandra",
  world: "world/the-wandering-inn",
  firstChapter: 734,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
