import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zail = {
  id: "01a0b70d-e563-7521-9cee-9a3dbe2ea5fd",
  type: "page-type/world-character",
  slug: "zail",
  title: "Zail",
  world: "world/the-wandering-inn",
  firstChapter: 366,
  lastChapter: 663,
  characterClaims: "jsonl",
  aliasOf: "world-character/zail-gemscale",
} as const satisfies WorldCharacter
