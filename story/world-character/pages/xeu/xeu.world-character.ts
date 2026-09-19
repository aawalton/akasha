import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xeu = {
  id: "01a0b70d-a351-71e4-ac30-abbeff82982f",
  type: "page-type/world-character",
  slug: "xeu",
  title: "Xeu",
  world: "world/the-wandering-inn",
  firstChapter: 521,
  lastChapter: 521,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
