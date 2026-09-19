import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const quelm = {
  id: "01a0b70c-7b79-72fc-b479-6d41181f18d2",
  type: "page-type/world-character",
  slug: "quelm",
  title: "Quelm",
  world: "world/the-wandering-inn",
  firstChapter: 313,
  lastChapter: 313,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
