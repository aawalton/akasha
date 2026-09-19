import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wirclaw = {
  id: "01a0b70d-9f0e-77e7-8023-c0bfdf8fc54c",
  type: "page-type/world-character",
  slug: "wirclaw",
  title: "Wirclaw",
  world: "world/the-wandering-inn",
  firstChapter: 219,
  lastChapter: 219,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
