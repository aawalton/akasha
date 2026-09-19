import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shurein = {
  id: "01a0b70c-ff37-7050-acc9-f85915e00425",
  type: "page-type/world-character",
  slug: "shurein",
  title: "Shurein",
  world: "world/the-wandering-inn",
  firstChapter: 554,
  lastChapter: 554,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
