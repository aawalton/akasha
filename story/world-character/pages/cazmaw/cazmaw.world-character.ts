import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cazmaw = {
  id: "01a0b709-f85c-7e56-b5b9-103b5c5e27fc",
  type: "page-type/world-character",
  slug: "cazmaw",
  title: "Cazmaw",
  world: "world/the-wandering-inn",
  firstChapter: 716,
  lastChapter: 716,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
