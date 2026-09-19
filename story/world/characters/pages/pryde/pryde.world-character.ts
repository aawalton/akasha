import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pryde = {
  id: "01a0b70c-76c1-7dd2-8536-efddede9ffb6",
  type: "page-type/world-character",
  slug: "pryde",
  title: "Pryde Ulta",
  world: "world/the-wandering-inn",
  firstChapter: 654,
  lastChapter: 659,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
