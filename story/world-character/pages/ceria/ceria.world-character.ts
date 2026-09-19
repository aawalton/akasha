import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ceria = {
  id: "01a0b706-d36f-7302-8ebe-8714473c0858",
  type: "page-type/world-character",
  slug: "ceria",
  title: "Ceria",
  world: "world/the-wandering-inn",
  firstChapter: 29,
  lastChapter: 796,
  characterClaims: "jsonl",
  aliasOf: "world-character/ceria-springwalker",
} as const satisfies WorldCharacter
