import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jewelOfGlitterblade = {
  id: "01a0b70b-1fd9-7d6b-b27d-f80eda9f8f11",
  type: "page-type/world-character",
  slug: "jewel-of-glitterblade",
  title: "Jewel of Glitterblade",
  world: "world/the-wandering-inn",
  firstChapter: 641,
  lastChapter: 641,
  characterClaims: "jsonl",
  aliasOf: "world-character/jewel",
} as const satisfies WorldCharacter
