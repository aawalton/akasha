import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cers = {
  id: "01a0b709-fbc1-7868-9f05-49ce91d2a69a",
  type: "page-type/world-character",
  slug: "cers",
  title: "Cers",
  world: "world/the-wandering-inn",
  firstChapter: 564,
  lastChapter: 564,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
