import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bea = {
  id: "01a0b707-7cae-7e0a-9adc-4c2b07429624",
  type: "page-type/world-character",
  slug: "bea",
  title: "Bea",
  world: "world/the-wandering-inn",
  firstChapter: 102,
  lastChapter: 615,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
