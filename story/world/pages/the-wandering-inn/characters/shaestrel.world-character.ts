import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shaestrel = {
  id: "01a0b70c-fa71-7f2c-8cc4-2346adbccd07",
  type: "page-type/world-character",
  slug: "shaestrel",
  title: "Shaestrel",
  world: "world/the-wandering-inn",
  firstChapter: 632,
  lastChapter: 683,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
