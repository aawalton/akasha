import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yittonByres = {
  id: "01a0b70d-ddd2-7cba-b2bd-8593cd804079",
  type: "page-type/world-character",
  slug: "yitton-byres",
  title: "Yitton Byres",
  world: "world/the-wandering-inn",
  firstChapter: 256,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
