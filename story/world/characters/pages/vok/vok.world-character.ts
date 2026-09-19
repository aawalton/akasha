import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vok = {
  id: "01a0b70d-96cc-7eb6-95ee-2bae7100a7ac",
  type: "page-type/world-character",
  slug: "vok",
  title: "Vokkhar",
  world: "world/the-wandering-inn",
  firstChapter: 510,
  lastChapter: 525,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
