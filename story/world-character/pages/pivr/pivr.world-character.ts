import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pivr = {
  id: "01a0b70c-7184-71dd-8c08-c49c12110435",
  type: "page-type/world-character",
  slug: "pivr",
  title: "Pivr",
  world: "world/the-wandering-inn",
  firstChapter: 235,
  lastChapter: 688,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
