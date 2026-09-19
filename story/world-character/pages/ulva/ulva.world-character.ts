import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ulva = {
  id: "01a0b70d-7ed0-717c-8c43-b744f2ad1486",
  type: "page-type/world-character",
  slug: "ulva",
  title: "Ulva Terland",
  world: "world/the-wandering-inn",
  firstChapter: 821,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/ulva-terland",
} as const satisfies WorldCharacter
