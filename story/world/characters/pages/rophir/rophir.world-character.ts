import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rophir = {
  id: "01a0b70c-9d2f-79b2-b579-80d4051089de",
  type: "page-type/world-character",
  slug: "rophir",
  title: "Rophir",
  world: "world/the-wandering-inn",
  firstChapter: 529,
  lastChapter: 529,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
