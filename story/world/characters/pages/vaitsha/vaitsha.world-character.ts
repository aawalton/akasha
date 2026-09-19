import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vaitsha = {
  id: "01a0b70d-83a9-777a-9a30-96852fe28e04",
  type: "page-type/world-character",
  slug: "vaitsha",
  title: "Vaitsha",
  world: "world/the-wandering-inn",
  firstChapter: 370,
  lastChapter: 370,
  characterClaims: "jsonl",
  aliasOf: "world-character/vaitsha-zectiou",
} as const satisfies WorldCharacter
