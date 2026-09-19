import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yeque = {
  id: "01a0b70d-dc36-7d2e-8089-f052022e3efc",
  type: "page-type/world-character",
  slug: "yeque",
  title: "Yeque",
  world: "world/the-wandering-inn",
  firstChapter: 546,
  lastChapter: 546,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
