import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const troyAtlas = {
  id: "01a0b70d-731c-78bc-b012-447e5da2201d",
  type: "page-type/world-character",
  slug: "troy-atlas",
  title: "Troy Atlas",
  world: "world/the-wandering-inn",
  firstChapter: 545,
  lastChapter: 556,
  characterClaims: "jsonl",
  aliasOf: "world-character/trey-atwood",
} as const satisfies WorldCharacter
