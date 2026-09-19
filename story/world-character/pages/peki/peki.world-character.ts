import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const peki = {
  id: "01a0b70c-2632-73e8-9d1e-4f7daa31f1ce",
  type: "page-type/world-character",
  slug: "peki",
  title: "Peki",
  world: "world/the-wandering-inn",
  firstChapter: 404,
  lastChapter: 560,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
