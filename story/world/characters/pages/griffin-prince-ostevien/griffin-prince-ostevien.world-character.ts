import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const griffinPrinceOstevien = {
  id: "01a0b70a-ebbe-74b8-b48a-9f91a4390e9b",
  type: "page-type/world-character",
  slug: "griffin-prince-ostevien",
  title: "Ostevien",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
