import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ceria = {
  id: "01a0b706-d36f-7302-8ebe-8714473c0858",
  type: "page-type/world-character",
  slug: "ceria",
  title: "Ceria",
  world: "world/the-wandering-inn",
  firstChapter: 104,
  lastChapter: 104,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
