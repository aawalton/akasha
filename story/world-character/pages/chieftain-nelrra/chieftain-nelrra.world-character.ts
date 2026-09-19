import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chieftainNelrra = {
  id: "01a0b709-fea8-7de9-bc32-f6770c3f69b2",
  type: "page-type/world-character",
  slug: "chieftain-nelrra",
  title: "Nelrra",
  world: "world/the-wandering-inn",
  firstChapter: 400,
  lastChapter: 400,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
