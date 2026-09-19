import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hethon = {
  id: "01a0b70a-fa5d-7fcb-b29b-5f17c251658f",
  type: "page-type/world-character",
  slug: "hethon",
  title: "Hethon",
  world: "world/the-wandering-inn",
  firstChapter: 653,
  lastChapter: 656,
  characterClaims: "jsonl",
  aliasOf: "world-character/hethon-veltras",
} as const satisfies WorldCharacter
