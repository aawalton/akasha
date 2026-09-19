import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wer = {
  id: "01a0b70d-9c16-7d4e-880b-8f0febf57281",
  type: "page-type/world-character",
  slug: "wer",
  title: "Wer",
  world: "world/the-wandering-inn",
  firstChapter: 683,
  lastChapter: 683,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
