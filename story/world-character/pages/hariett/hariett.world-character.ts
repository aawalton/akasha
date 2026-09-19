import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const hariett = {
  id: "01a0b70a-f0c2-7033-a19c-b5d190aacec7",
  type: "page-type/world-character",
  slug: "hariett",
  title: "Hariett",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
