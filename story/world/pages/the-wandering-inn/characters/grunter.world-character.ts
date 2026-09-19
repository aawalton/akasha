import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grunter = {
  id: "01a0b70a-ec94-76ed-a307-7bf344eb120e",
  type: "page-type/world-character",
  slug: "grunter",
  title: "Grunter",
  world: "world/the-wandering-inn",
  firstChapter: 143,
  lastChapter: 146,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
