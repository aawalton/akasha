import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const devrkr = {
  id: "01a0b70a-18dc-723a-b04f-f1d4c5297cf6",
  type: "page-type/world-character",
  slug: "devrkr",
  title: "Devrkr the Glowing",
  world: "world/the-wandering-inn",
  firstChapter: 805,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
