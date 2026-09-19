import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const godreiad = {
  id: "01a0b70a-e4c9-7eb2-aead-46832c97f122",
  type: "page-type/world-character",
  slug: "godreiad",
  title: "Godreiad",
  world: "world/the-wandering-inn",
  firstChapter: 722,
  lastChapter: 722,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
