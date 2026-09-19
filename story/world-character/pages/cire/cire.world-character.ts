import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cire = {
  id: "01a0b70a-011e-7733-859c-fc98abd6383d",
  type: "page-type/world-character",
  slug: "cire",
  title: "Cirediel",
  world: "world/the-wandering-inn",
  firstChapter: 447,
  lastChapter: 491,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
