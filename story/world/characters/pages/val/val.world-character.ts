import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const val = {
  id: "01a0b70d-8456-7cfc-a462-d35bba59b268",
  type: "page-type/world-character",
  slug: "val",
  title: "Valceif",
  world: "world/the-wandering-inn",
  firstChapter: 86,
  lastChapter: 93,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
