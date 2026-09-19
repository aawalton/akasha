import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hawkTheHare = {
  id: "01a0b70a-f37d-7509-a642-85eb4c8a5c82",
  type: "page-type/world-character",
  slug: "hawk-the-hare",
  title: "Hawk",
  world: "world/the-wandering-inn",
  firstChapter: 468,
  lastChapter: 468,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
