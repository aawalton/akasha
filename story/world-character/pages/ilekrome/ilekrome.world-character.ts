import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ilekrome = {
  id: "01a0b70b-07c2-703f-936e-8cb9fd6eabf4",
  type: "page-type/world-character",
  slug: "ilekrome",
  title: "Ilekrome",
  world: "world/the-wandering-inn",
  firstChapter: 576,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
