import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const booste = {
  id: "01a0b707-8884-79dd-9a1c-cf8113c98e70",
  type: "page-type/world-character",
  slug: "booste",
  title: "Booste",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
