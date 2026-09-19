import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cameral = {
  id: "01a0b707-9125-7fb8-9dc7-394e9ca66f70",
  type: "page-type/world-character",
  slug: "cameral",
  title: "Cameral",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 381,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
