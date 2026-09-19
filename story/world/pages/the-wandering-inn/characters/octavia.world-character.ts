import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const octavia = {
  id: "01a0b70c-1419-7cfd-83ef-c218c7056666",
  type: "page-type/world-character",
  slug: "octavia",
  title: "Octavia",
  world: "world/the-wandering-inn",
  firstChapter: 77,
  lastChapter: 793,
  characterClaims: "jsonl",
  aliasOf: "world-character/octavia-cotton",
} as const satisfies WorldCharacter
