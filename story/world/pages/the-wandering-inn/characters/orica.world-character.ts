import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const orica = {
  id: "01a0b70c-1a02-7773-acb9-99cffce5191d",
  type: "page-type/world-character",
  slug: "orica",
  title: "Orica",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
