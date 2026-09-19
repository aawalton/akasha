import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordToldosEveright = {
  id: "01a0b70b-8b6b-7600-a753-86827dff4a62",
  type: "page-type/world-character",
  slug: "lord-toldos-everight",
  title: "Lord Toldos Everight",
  world: "world/the-wandering-inn",
  firstChapter: 472,
  lastChapter: 472,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
